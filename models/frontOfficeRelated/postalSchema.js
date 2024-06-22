const mongoose = require("mongoose");

const postalSchema = new mongoose.Schema({
  toTitle: {
    type: String,
    required: true
  },
  fromTitle: {
    type: String,
    required: true
  },
  refrenceNo: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  postalType: {
    type: String,
    default: "Dispatch"
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
  }
}, { timestamps: true })

const Postal = mongoose.model("postal", postalSchema);

module.exports = Postal;