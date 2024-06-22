const mongoose = require("mongoose")

const assignedClassTeacherSchema = new mongoose.Schema({
    sclassName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass'
    },
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'section',
        }
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'teacher',
        }
    ],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true });

const AssignedClassTeacher = mongoose.model("assignedClassTeacher", assignedClassTeacherSchema)

module.exports = AssignedClassTeacher