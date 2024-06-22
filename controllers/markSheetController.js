const MarkSheet = require('../models/markSheetSchema.js');
const Student = require('../models/userRelated/studentSchema.js');
const { formatName } = require('../utils/quickFunctions.js');
const { sendErrorResponse } = require('../utils/responseHandler.js');

exports.markSheetCreate = async (req, res) => {
    try {
        const markSheet = new MarkSheet({
            ...req.body,
            school: req.user.school
        });

        const result = await markSheet.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.allMarkSheetList = async (req, res) => {
    try {
        let markSheets = await MarkSheet.find({ school: req.user.school })
            .collation({ locale: "en" }) 
            .sort({ certificateName: 1 }) 
            .populate("examinationName", "examName")
            .populate("school", "schoolName");

        if (markSheets.length > 0) {
            res.send(markSheets);
        } else {
            res.send({ message: "No admit cards found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};


exports.markSheetPrintDetails = async (req, res) => {
    try {
        const { studentID, msID }  = req.params

        let markSheet = await MarkSheet.findById(msID)
            .populate("examinationName", "examName")
            .populate("school", "schoolName")

        let student = await Student.findById(studentID)
            .populate("sclassName", "sclassName")
            .populate("school", "schoolName")
            .populate("section", "sectionName")

        if (markSheet && student) {
            res.send({
                ...markSheet.toObject(),
                ...student.toObject(),
                name: formatName(student?.studentName)
            })
        } else {
            res.send({ message: "No admit card found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.markSheetUpdate = async (req, res) => {
    try {
        let result = await MarkSheet.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }).collation({ locale: "en" }).sort({ certificateName: 1 })


        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}