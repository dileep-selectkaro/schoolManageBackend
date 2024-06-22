const ExamStudent = require('../models/examStudentSchema.js');
const { createDocument } = require('../services/globalService.js');
const { formatName } = require('../utils/quickFunctions.js');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler.js');

exports.examStudentCreate = async (req, res) => {
    try {
        const { examGroup, examinationType, sessionYear, sclass, section, examStudents } = req.body;

        const school = req.user.school

        let examStudent = await ExamStudent.findOne({
            examGroup: examGroup,
            examinationType: examinationType,
            sessionYear,
            sclass: sclass,
            section: section,
            school: school,
        })

        if (examStudent) {
            examStudent.examStudents = examStudents

            await examStudent.save();

            res.send(examStudent)
        } else {
            const result = await createDocument(ExamStudent, {
                ...req.body,
                school,
            });

            sendSuccessResponse(res, result);
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.examStudentList = async (req, res) => {
    try {
        const { sclassName, sectionName, sessionYear, examinationType } = req.params;

        let examStudent = await ExamStudent.findOne({
            examinationType: examinationType,
            sessionYear,
            sclass: sclassName,
            section: sectionName,
            school: req.user.school,
        })
            .populate("examStudents", "studentName rollNum gender")

        if (examStudent) {
            const students = examStudent.examStudents

            let modifiedStudents = students.map((student) => {
                return {
                    ...student._doc,
                    name: formatName(student?.studentName)
                };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No exam students found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.examStudentUpdate = async (req, res) => {
    try {
        let result = await ExamStudent.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteExamStudent = async (req, res) => {
    try {
        const result = await ExamStudent.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}