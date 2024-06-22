const mongoose = require("mongoose");
const phoneCallLogSchema = new mongoose.Schema({
  providedName: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  followUpDate: {
    type: Date,
    required: true
  },
  callDuration: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  callType: {
    type: String,
    enum: ['Incoming', 'Outgoing'],
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
  }
}, { timestamps: true })

const PhoneCallLog = mongoose.model("phoneCallLog", phoneCallLogSchema);

module.exports = PhoneCallLog;