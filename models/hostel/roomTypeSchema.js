const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
    roomTypeName: {
        type: String,
        required: true
    },
    roomTypeDescription: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    }
}, { timestamps: true })

const RoomType = mongoose.model("roomType", roomTypeSchema);

module.exports = RoomType;