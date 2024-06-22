const mongoose = require("mongoose")

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    occupation: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "Parent"
    },
    child: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    },
});

const Parent = mongoose.model("parent", parentSchema)
module.exports = Parent