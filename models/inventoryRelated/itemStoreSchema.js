const mongoose = require("mongoose");

const itemStoreSchema = new mongoose.Schema({
  itemStoreName: {
    type: String,
    required: true,
  },
  itemStoreCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  }
}, { timestamps: true });

const ItemStore = mongoose.model("itemStore", itemStoreSchema);

module.exports = ItemStore;