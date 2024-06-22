const mongoose = require("mongoose");

const sclassSchema = new mongoose.Schema({
    sclassName: {
        type: String,
        required: true,
    },
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'section',
        }
    ],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true });

const Sclass = mongoose.model("sclass", sclassSchema);

module.exports = Sclass