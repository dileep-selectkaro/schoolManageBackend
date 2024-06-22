const mongoose = require('mongoose');

const classRoutineSchema = new mongoose.Schema({
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass'
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section'
    },
    dayOfWeek: {
        type: String,
    },
    sessionDetails: [
        {
            sessionStartTime: {
                type: String,
            },
            sessionEndTime: {
                type: String,
            },
            sessionType: {
                type: String,
            },
            sessionSubject: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subject',
            },
            sessionTeacher: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'teacher',
            },
            sessionRoom: {
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

const ClassRoutine = mongoose.model('classRoutine', classRoutineSchema);

module.exports = ClassRoutine