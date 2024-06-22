const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
    },
    subCode: {
        type: String,
    },
    subType: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true });

module.exports = mongoose.model("subject", subjectSchema);