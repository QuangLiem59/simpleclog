const mongoose = require('mongoose');

const schemaCalllog = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    CallTo: { type: String, trim: true, required: true },
    StartTime: { type: String, trim: true, required: true },
    StopTime: { type: String, trim: true, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Calllog', schemaCalllog)