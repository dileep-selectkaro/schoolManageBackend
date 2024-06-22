const mongoose = require("mongoose")

const marksGradeSchema = new mongoose.Schema({
    examType: {
        type: String,
        required: true
    },
    marksGradeDetails: [
        {
            gradeName: {
                type: String,
                required: true
            },
            percentUpto: {
                type: Number,
                required: true
            },
            percentFrom: {
                type: Number,
                required: true
            },
            gradePoint: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true });

const MarksGrade = mongoose.model("marksGrade", marksGradeSchema)

module.exports = MarksGrade