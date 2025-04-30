const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
    name: { type: String, required: true,},
    email: { type: String, required: true},
    role: { type: String, required: true },
}, {
    timestamps: true,
});

const Tuser = mongoose.model('Tuser', userSchema);

module.exports = Tuser;
