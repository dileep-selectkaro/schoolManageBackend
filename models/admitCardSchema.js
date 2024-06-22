const mongoose = require("mongoose")

const admitCardSchema = new mongoose.Schema({
    certificateName: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    title: {
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
    footerText: {
        type: String,
        required: true
    },
    leftLogo: {
        type: String,
    },
    rightLogo: {
        type: String,
    },
    signature: {
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

const AdmitCard = mongoose.model("admitCard", admitCardSchema)

module.exports = AdmitCard