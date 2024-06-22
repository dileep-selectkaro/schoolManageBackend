const Examination = require('../models/examinationSchema.js');
const { sendErrorResponse } = require('../utils/responseHandler.js');

exports.examinationCreate = async (req, res) => {
    try {
        const examination = new Examination({
            ...req.body,
            school: req.user.school
        });

        const result = await examination.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.examinationList = async (req, res) => {
    try {
        let examinations = await Examination.find({
            examGroup: req.params.examGroup,
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ examName: 1 })

        if (examinations.length > 0) {
            res.send(examinations)
        } else {
            res.send({ message: "No examinations found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.allExaminationList = async (req, res) => {
    try {
        let examinations = await Examination.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ examName: 1 })


        if (examinations.length > 0) {
            res.send(examinations)
        } else {
            res.send({ message: "No examinations found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.examinationUpdate = async (req, res) => {
    try {
        let result = await Examination.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}