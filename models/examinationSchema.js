const mongoose = require("mongoose");

const examinationSchema = new mongoose.Schema({
    examName: {
        type: String,
    },
    sessionYear: {
        type: String,
    },
    publish: {
        type: Boolean,
        default: false
    },
    publishResult: {
        type: Boolean,
        default: false
    },
    rollNumInfo: {
        type: String,
    },
    description: {
        type: String,
    },
    examGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examGroup'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true });

const Examination = mongoose.model("examination", examinationSchema);
module.exports = Examination