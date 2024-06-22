const mongoose = require("mongoose");

const itemStockSchema = new mongoose.Schema({
  itemCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "itemCategory",
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
    required: true,
  },
  itemSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "itemSupplier",
    required: true,
  },
  itemStore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "itemStore",
    required: true,
  },
  quantity: {
    type: String,
    required: true
  },
  purchasePrice: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attachDocument: {
    type: String,
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

const ItemStock = mongoose.model("itemStock", itemStockSchema);

module.exports = ItemStock;
