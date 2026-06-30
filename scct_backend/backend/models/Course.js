const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discount: { type: String, required: true },
    startDate: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);