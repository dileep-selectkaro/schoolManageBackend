const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema({
    sourceName: {
        type: String,
    },
    sourceDescription: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true })

const Source = mongoose.model("source", sourceSchema);

module.exports = Source