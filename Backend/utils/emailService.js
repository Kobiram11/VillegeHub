// utils/emailService.js
const nodemailer = require('nodemailer');

// Create transporter using your email service
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    secure: true, // Use TLS for secure connection
});
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_MAIL:', process.env.SMTP_MAIL);


// Function to send an email
const sendEmail = async (to, subject, fullName) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to,
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">Welcome to Election Management</h2>
                    <p>Hello <strong>${fullName}</strong>,</p>
                    <p>Your details have been successfully registered in our election management system.</p>
                    <p>Thank you for being a part of our community!</p>
                    <br>
                    <footer style="font-size: 0.8em; color: #777;">
                        <p>Best regards,<br>Election Management Team</p>
                    </footer>
                </div>
            `,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


module.exports = { sendEmail };
