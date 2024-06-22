const Examination = require("../models/examinationSchema");
const StudentExam = require("../models/studentExamSchema");
const Student = require("../models/userRelated/studentSchema");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/responseHandler");

exports.studentExamSubjectProvideMarks = async (req, res) => {
    try {
        const {
            student,
            examinationType,
            sessionYear,

            examSubject,
            absentStatus,
            marksObtained,
            teacherNote,
        } = req.body

        const school = req.user.school

        let findedStudent = await Student.findById(student)
        if (!findedStudent) {
            return res.send({ message: "No students found" });
        }

        let findedExamination = await Examination.findById(examinationType)
        if (!findedExamination) {
            return res.send({ message: "No examination found" });
        }

        const examGroup = findedExamination.examGroup
        const sclass = findedStudent.sclassName
        const section = findedStudent.section

        const findedStudentExamDetails = await StudentExam.findOne({
            student,
            examGroup,
            examinationType,
            sclass,
            section,
            sessionYear,
            school,
        });

        if (findedStudentExamDetails) {

            const existingSubjectIndex = findedStudentExamDetails.markDetails.findIndex(
                (subjectItem) => subjectItem?.examSubject.toString() === examSubject
            );

            if (existingSubjectIndex !== -1) {

                const existingSubjectDetails = findedStudentExamDetails.markDetails[existingSubjectIndex];

                existingSubjectDetails.absentStatus = absentStatus
                existingSubjectDetails.marksObtained = marksObtained
                existingSubjectDetails.teacherNote = teacherNote

            } else {

                findedStudentExamDetails?.markDetails.push({
                    examSubject,
                    absentStatus,
                    marksObtained,
                    teacherNote,
                });
            }

            await findedStudentExamDetails.save();

            sendSuccessResponse(res, { success: "success" });

        } else {
            const newStudentExam = new StudentExam({
                student,
                examGroup,
                examinationType,
                sclass,
                section,
                sessionYear,
                school,
            });

            newStudentExam.markDetails.push({
                examSubject,
                absentStatus,
                marksObtained,
                teacherNote,
            });

            await newStudentExam.save();

            sendSuccessResponse(res, { success: "success" });
        }

    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.examResultList = async (req, res) => {
    try {
        const {
            examGroup,
            examinationType,
            sclass,
            section,
            sessionYear,
        } = req.params

        let findedStudentExams = await StudentExam.find({
            examGroup,
            examinationType,
            sclass,
            section,
            sessionYear,
            school: req.user.school,
        })
            .populate({
                path: 'student',
                select: 'studentName rollNum',
            })
            .populate("markDetails.examSubject", "subName")

        if (findedStudentExams.length > 0) {
            res.send(findedStudentExams)
        } else {
            res.send({ message: "No exam details found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.examRankList = async (req, res) => {
    try {
        const {
            examGroup,
            examinationType,
            sessionYear,
        } = req.params

        let findedStudentExams = await StudentExam.find({
            examGroup,
            examinationType,
            sessionYear,
            school: req.user.school,
        })
            .populate({
                path: 'student',
                select: 'studentName rollNum',
            })
            .populate("sclass", "sclassName")
            .populate("section", "sectionName")
            .populate("markDetails.examSubject", "subName")

        if (findedStudentExams.length > 0) {
            res.send(findedStudentExams)
        } else {
            res.send({ message: "No exam details found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.examResultDetails = async (req, res) => {
    try {
        let studentExam = await StudentExam.findById(req.params.id);
        if (studentExam) {
            res.send(studentExam);
        }
        else {
            res.send({ message: "No student Exam Detail found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.studentExamDetails = async (req, res) => {
    try {
        const {
            studentID,
            examinationID,
            sessionYear
        } = req.params

        let studentExam = await StudentExam.findOne(
            {
                student: studentID,
                examinationType: examinationID,
                sessionYear: sessionYear,
                school: req.user.school,
            }
        )
            .populate("markDetails.examSubject", "subName")

        if (studentExam) {
            res.send(studentExam);
        }
        else {
            res.send({ message: "No student Exam Detail found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}