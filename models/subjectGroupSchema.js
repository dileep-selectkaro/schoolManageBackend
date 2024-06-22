const mongoose = require("mongoose");

const subjectGroupSchema = new mongoose.Schema({
    subjectGroupName: {
        type: String,
        required: true,
    },
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
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
        }
    ],
    description: {
        type: String,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true });

const SubjectGroup = mongoose.model("subjectGroup", subjectGroupSchema);

module.exports = SubjectGroup