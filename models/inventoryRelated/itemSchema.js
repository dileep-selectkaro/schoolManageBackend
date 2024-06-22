const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
    },
    itemCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itemCategory'
    },
    itemUnit: {
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

const Item = mongoose.model("item", itemSchema);

module.exports = Item