const mongoose = require("mongoose");
const hostelSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true,
    },
    hostelType: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    intake: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    }
}, { timestamps: true })

const Hostel = mongoose.model("hostel", hostelSchema)

module.exports = Hostel