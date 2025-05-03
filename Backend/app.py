from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import io
import re

# 👉 Add this line after importing pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    if 'document' not in request.files:
        return jsonify({'error': 'No document uploaded'}), 400

    file = request.files['document']
    image_bytes = file.read()
    if not image_bytes:
        return jsonify({'error': 'Uploaded file is empty'}), 400

    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)

        name = re.search(r'(?i)Name:\s*(.*)', text)
        nic = re.search(r'(?i)NIC:\s*(.*)', text)
        dob = re.search(r'(?i)DOB:\s*(.*)', text)
        email = re.search(r'(?i)Email:\s*(.*)', text)
        family_ref = re.search(r'(?i)Family Ref(?:erence)?:\s*(.*)', text)

        extracted = {
            'name': name.group(1).strip() if name else '',
            'nic': nic.group(1).strip() if nic else '',
            'dob': dob.group(1).strip() if dob else '',
            'email': email.group(1).strip() if email else '',
            'family_ref': family_ref.group(1).strip() if family_ref else ''
        }

        return jsonify({'success': True, 'data': extracted})
    except Exception as e:
        return jsonify({'error': 'OCR processing failed', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
