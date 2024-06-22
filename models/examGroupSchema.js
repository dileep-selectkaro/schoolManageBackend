const mongoose = require("mongoose");

const examGroupSchema = new mongoose.Schema({
    examGroupName: {
        type: String,
    },
    examType: {
        type: String,
    },
    description: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true });

module.exports = mongoose.model("examGroup", examGroupSchema);