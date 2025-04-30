const appointModel = require('../models/appointmentModel');

// Function to generate appointment ID
const generateAppointmentId = async () => {
    const lastAppointment = await appointModel.findOne().sort({ appointmentId: -1 }).exec();
    
    if (!lastAppointment || !lastAppointment.appointmentId) {
        return "APID001"; // If no previous ID exists, start from APID001
    }

    const lastIdNumber = parseInt(lastAppointment.appointmentId.replace('APID', ''));
    const newIdNumber = lastIdNumber + 1;
    
    return `APID${newIdNumber.toString().padStart(3, '0')}`;
};

module.exports = generateAppointmentId;
