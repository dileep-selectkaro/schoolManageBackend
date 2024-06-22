const mongoose = require("mongoose")

const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "SuperAdmin"
    },
});

module.exports = mongoose.model("superAdmin", superAdminSchema)