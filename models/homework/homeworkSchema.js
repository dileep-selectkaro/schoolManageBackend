const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sclass",
        required: true
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
    },
    subjectGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjectGroup",
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true
    },
    homeworkDate: {
        type: Date,
        required: true
    },
    submissionDate: {
        type: Date,
        required: true
    },
    maxMarks: {
        type: String,
        required: true
    },
    attachDocument: {
        type: Buffer,
        required: true
    },
    attachDocumentName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    }
}, { timestamps: true })

const Homework = mongoose.model("homework", homeworkSchema);
module.exports = Homework