const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    profilePic: {
        type: String,
    },
    studentName: {
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
    rollNum: {
        type: Number,
    },
    password: {
        type: String,
    },

    parent: {
        name: String,
        phone: String,
        email: String,
        occupation: String,
    },

    birthDate: {
        type: Date,
    },
    bloodGroup: {
        type: String,
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    measurementDate: {
        type: Date,
    },
    medicalHistory: {
        type: String,
    },
    religion: {
        type: String,
    },
    caste: {
        type: String,
    },
    casteCategory: {
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

    admissionNum: {
        type: String,
    },
    admissionDate: {
        type: Date,
    },
    academicYear: {
        type: String,
    },
    residencyStatus: {
        type: String,
        default: 'Day Scholar'
    },
    role: {
        type: String,
        default: "Student"
    },
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section'
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentHouse',
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    },
    active: {
        type: Boolean,
        default: true
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hostel',
    },
    hostelRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hostelRoom',
    },
    attendance: [{
        date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
        },
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
        }
    }]
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student