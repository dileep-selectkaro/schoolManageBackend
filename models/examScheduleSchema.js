const mongoose = require('mongoose');

const examScheduleSchema = new mongoose.Schema({
    examGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examGroup'
    },
    examinationType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examination'
    },
    examDetails: [
        {
            examSubject: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            examDate: {
                type: Date,
            },
            examStartTime: {
                type: String,
            },
            examEndTime: {
                type: String,
            },
            examRoom: {
                type: String,
            },
            examMaxMarks: {
                type: String,
            },
            examMinMarks: {
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

const ExamSchedule = mongoose.model('examSchedule', examScheduleSchema);
module.exports = ExamSchedule