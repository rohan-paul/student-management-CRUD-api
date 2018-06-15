const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    address: String,
    batch: String,
    work_Experience: Number,
    updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Student', StudentSchema)