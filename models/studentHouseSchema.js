const mongoose = require("mongoose");

const studentHouseSchema = new mongoose.Schema({
    studentHouseId: {
        type: String,
        required: true,
    },
    studentHouseName: {
        type: String,
        required: true,
    },
    studentHouseDescription: {
        type: String,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    }
}, { timestamps: true });

const StudentHouse = mongoose.model("studentHouse", studentHouseSchema);

module.exports = StudentHouse;