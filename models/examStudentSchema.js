const mongoose = require('mongoose');

const examStudentSchema = new mongoose.Schema({
    examGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examGroup'
    },
    examinationType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examination'
    },
    sessionYear: {
        type: String
    },
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section'
    },
    examStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
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

const ExamStudent = mongoose.model('examStudent', examStudentSchema);
module.exports = ExamStudent