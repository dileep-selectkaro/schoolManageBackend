const mongoose = require("mongoose")

const marksDivisionSchema = new mongoose.Schema({
    marksDivisionName: {
        type: String,
        required: true
    },
    percentFrom: {
        type: Number,
        required: true
    },
    percentUpto: {
        type: Number,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true });

const MarksDivision = mongoose.model("marksDivision", marksDivisionSchema)
module.exports = MarksDivision