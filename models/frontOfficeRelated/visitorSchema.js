const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
  },
  meetingWith: {
    type: String,
    required: true,
  },
  purpose: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'purpose'
  },
  phone: {
    type: Number,
    required: true,
  },
  idCard: {
    type: String,
    required: true,
  },
  numberOfPerson: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  inTime: {
    type: String,
    required: true,
  },
  outTime: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  attachDocument: {
    type: String
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  }
}, { timestamps: true });

const Visitor = mongoose.model("visitor", visitorSchema);

module.exports = Visitor;
