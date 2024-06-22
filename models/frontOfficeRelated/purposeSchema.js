const mongoose = require("mongoose");

const purposeSchema = new mongoose.Schema({
    purposeName: {
        type: String,
    },
    purposeDescription: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true })

const Purpose = mongoose.model("purpose", purposeSchema);

module.exports = Purpose