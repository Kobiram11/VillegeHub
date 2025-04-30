const express = require('express');
const router = express.Router();
const Notice = require('../models/notice'); // Import the Notice model
const PDFDocument = require('pdfkit');

// Create a new notice (POST /notice/add)
router.post('/add', async (req, res) => {
    const {id, noticeCategory, description} = req.body;

    try {
        const newNotice = new Notice({id,
             noticeCategory,
             description,
             createdAt: new Date()
            });
        const savedNotice = await newNotice.save();
        res.status(201).json(savedNotice);
    } catch (error) {
        console.log('Error saving notice:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get all notices (GET /notice)
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json(notices);
    } catch (error) {
        console.log('Error fetching notices:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get a specific notice by custom ID (GET /notice/:id)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const notice = await Notice.findOne({ id }); // This uses your custom id field (starts with NT)

        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }

        res.json(notice);
    } catch (error) {
        console.log('Error fetching notice:', error);
        res.status(500).json({ message: error.message });
    }
});



// Update a notice (PUT /notice/update/:id)
router.put('/update/:id', async (req, res) => {
    const { noticeCategory, description, createdAt } = req.body;
    const { id } = req.params;

    try {
        const updatedNotice = await Notice.findByIdAndUpdate(
            id,
            { noticeCategory, description, createdAt },
            { new: true }
        );

        if (!updatedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }

        res.json(updatedNotice);
    } catch (error) {
        console.log('Error updating notice:', error);
        res.status(500).json({ message: error.message });
    }
});

// Delete a notice (DELETE /notice/delete/:id)
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNotice = await Notice.findByIdAndDelete(id);

        if (!deletedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }

        res.status(204).send({ status: "Notice Deleted!" });
    } catch (error) {
        console.log('Error deleting notice:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get notices by category (GET /notice/category/:category)
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const notices = await Notice.find({ noticeCategory: category });

        if (!notices.length) {
            return res.status(404).json({ message: "No notices found for this category." });
        }

        res.json(notices);
    } catch (error) {
        console.log('Error fetching notices by category:', error);
        res.status(500).json({ message: error.message });
    }
});


// Generate PDF report for a category (GET /notice/report/:category)
router.get('/report/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const notices = await Notice.find({ noticeCategory: category });

        if (!notices.length) {
            return res.status(404).json({ message: "No notices found for this category." });
        }

        // Create a new PDF document
        const doc = new PDFDocument();
        const filename = `notices_${category}.pdf`;

        // Set the headers for downloading the file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

        // Pipe the PDF document to the response
        doc.pipe(res);

        // Add title and formatting to the PDF
        doc.fontSize(18).text(`Notice Report - ${category}`, { align: 'center' });
        doc.moveDown();

        // Add each notice to the PDF
        notices.forEach((notice, index) => {
            doc.fontSize(12).text(`Notice ${index + 1}`, { underline: true });
            doc.text(`ID: ${notice.id}`);
            doc.text(`Description: ${notice.description}`);
            doc.text(`Created At: ${new Date(notice.createdAt).toLocaleDateString()}`);
            doc.moveDown();
        });

        // Finalize the PDF and end the stream
        doc.end();
    } catch (error) {
        console.log('Error generating PDF report:', error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
