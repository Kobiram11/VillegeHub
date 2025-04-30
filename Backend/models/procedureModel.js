const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const procedureSchema = new Schema({
    ServiceName: {
        type: String,
        required: true,
        unique: true
    },
    ServiceDetail: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Procedure', procedureSchema);
