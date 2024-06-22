const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    profilePic: {
        type: String,
    },
    teacherName: {
        firstName: {
            type: String,
        },
        middleName: {
            type: String
        },
        lastName: {
            type: String,
        },
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },

    birthDate: {
        type: Date,
    },
    religion: {
        type: String,
    },
    gender: {
        type: String,
    },

    address: {
        city: String,
        state: String,
        postalCode: String,
        country: String
    },

    role: {
        type: String,
        default: "Teacher"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    },
    active: {
        type: Boolean,
        default: true
    },
    isStaff: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Teacher = mongoose.model("teacher", teacherSchema)
module.exports = Teacher