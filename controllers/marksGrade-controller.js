const MarksGrade = require('../models/marksGradeSchema');
const {
    createDocument,
    getDocumentList,
    updateDocumentById,
    deleteDocumentById,
    deleteDocumentsByQuery,
} = require('../services/globalService');
const {
    sendSuccessResponse,
    sendNotFoundResponse,
    sendErrorResponse
} = require('../utils/responseHandler');

exports.marksGradeCreate = async (req, res) => {
    try {
        const { examType, marksGradeDetails } = req.body

        const school = req.user.school

        const findedMarksGradeDetails = await MarksGrade.findOne({
            examType: examType,
            school: school,
        });

        if (findedMarksGradeDetails) {
            findedMarksGradeDetails.marksGradeDetails.push(...marksGradeDetails);
            const result = await findedMarksGradeDetails.save();

            sendSuccessResponse(res, result);
        }
        else {
            const result = await createDocument(MarksGrade, {
                ...req.body,
                school,
            });

            sendSuccessResponse(res, result);
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.marksGradeList = async (req, res) => {
    try {
        getDocumentList(res, MarksGrade,
            { school: req.user.school }
        )
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateMarksGrade = async (req, res) => {
    try {
        const marksGrade = await MarksGrade.findById(req.params.id);

        marksGrade.marksGradeDetails = req.body

        const result = await updateDocumentById(MarksGrade, req.params.id, { $set: marksGrade });
        sendSuccessResponse(res, result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.deleteMarksGrade = async (req, res) => {
    try {
        const result = await deleteDocumentById(MarksGrade, req.params.id);
        sendSuccessResponse(res, result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.deleteMarksGrades = async (req, res) => {
    try {
        const result = await deleteDocumentsByQuery(MarksGrade, { school: req.params.id });
        if (result.deletedCount === 0) {
            sendNotFoundResponse(res);
        } else {
            sendSuccessResponse(res, result);
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};