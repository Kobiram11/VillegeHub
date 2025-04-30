from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import io
import re

# Set the path to Tesseract OCR (✅ update if installed in another path)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = Flask(__name__)
CORS(app)  # Allow frontend access (localhost:3000)

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    try:
        image = Image.open(io.BytesIO(file.read()))
        text = pytesseract.image_to_string(image)
        print("🔍 OCR Text:\n", text)  # ✅ See what was detected

        # Extract data using simple regex
        name = re.search(r'Name:\s*(.*)', text)
        nic = re.search(r'NIC:\s*(.*)', text)
        dob = re.search(r'DOB:\s*(.*)', text)

        return jsonify({
            'name': name.group(1).strip() if name else '',
            'nic': nic.group(1).strip() if nic else '',
            'dob': dob.group(1).strip() if dob else ''
        })

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({'error': 'OCR processing failed'}), 500

# Default route (optional: for health check)
@app.route('/')
def index():
    return jsonify({'message': 'OCR API is running'}), 200

if __name__ == '__main__':
    app.run(debug=True)
