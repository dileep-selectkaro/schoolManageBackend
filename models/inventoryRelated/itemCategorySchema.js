const mongoose = require("mongoose");

const itemCategorySchema = new mongoose.Schema({
    itemCategoryName: {
        type: String,
    },
    itemCategoryDescription: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true })

const ItemCategory = mongoose.model("itemCategory", itemCategorySchema);

module.exports = ItemCategory