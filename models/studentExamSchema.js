const mongoose = require('mongoose');

const studentExamSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    examGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examGroup'
    },
    examinationType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examination'
    },
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass'
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section'
    },
    sessionYear: {
        type: String,
    },
    markDetails: [
        {
            examSubject: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            absentStatus: {
                type: Boolean,
                default: false
            },
            marksObtained: {
                type: Number,
            },
            teacherNote: {
                type: String,
            },
        }
    ],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const StudentExam = mongoose.model('studentExam', studentExamSchema);
module.exports = StudentExam