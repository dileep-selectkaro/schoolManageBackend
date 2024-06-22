const mongoose = require("mongoose")

const markSheetSchema = new mongoose.Schema({
    certificateName: {
        type: String,
        required: true
    },
    examinationName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examination',
        required: true
    },
    examCenter: {
        type: String,
        required: true
    },
    bodyText: {
        type: String,
        required: true
    },
    footerText: {
        type: String,
        required: true
    },
    printingDate: {
        type: Date,
        required: true
    },
    headerImage: {
        type: String,
    },
    leftLogo: {
        type: String,
    },
    rightLogo: {
        type: String,
    },
    leftSignature: {
        type: String,
    },
    middleSignature: {
        type: String,
    },
    rightSignature: {
        type: String,
    },
    backgroundImage: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true });

const MarkSheet = mongoose.model("markSheet", markSheetSchema)

module.exports = MarkSheet