const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
    referenceName: {
        type: String,
    },
    referenceDescription: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true })

const Reference = mongoose.model("reference", referenceSchema);

module.exports = Reference