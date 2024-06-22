const mongoose = require("mongoose");

const admissionEnquirySchema = new mongoose.Schema({
  providedName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  followUpDate: {
    type: Date,
    required: true,
  },
  assigned: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "assignedType",
    required: true,
  },
  assignedType: {
    type: String,
    required: true,
  },
  reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reference",
  },
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "source",
  },
  sclass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sclass",
  },
  numberOfChild: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  admissionEnquiryStatus: {
    type: String,
    default: "Active"
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  }
}, { timestamps: true });

const AdmissionEnquiry = mongoose.model("admissionEnquiry", admissionEnquirySchema);

module.exports = AdmissionEnquiry;