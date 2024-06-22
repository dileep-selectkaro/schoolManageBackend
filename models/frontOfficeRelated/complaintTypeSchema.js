const mongoose = require("mongoose");

const complaintTypeSchema = new mongoose.Schema({
    complaintTypeName: {
        type: String,
    },
    complaintTypeDescription: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true })

const ComplaintType = mongoose.model("complaintType", complaintTypeSchema);

module.exports = ComplaintType