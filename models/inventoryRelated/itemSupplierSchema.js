const mongoose = require("mongoose");

const itemSupplierSchema = new mongoose.Schema({
  supplierPerson: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },

  address: {
    type: String,
    required: true,
  },

  contactPerson: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
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

const ItemSupplier = mongoose.model("itemSupplier", itemSupplierSchema);

module.exports = ItemSupplier;
