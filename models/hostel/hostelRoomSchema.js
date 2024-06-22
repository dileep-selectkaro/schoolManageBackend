const mongoose = require("mongoose");

const hostelRoomSchema = new mongoose.Schema({
    hostelRoomName: {
        type: String,
        required: true
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel"
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roomType",
    },
    bedNumber: {
        type: String,
        required: true
    },
    costPerBed: {
        type: String,
        required: true,
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

const HostelRoom = mongoose.model("hostelRoom", hostelRoomSchema);

module.exports = HostelRoom;