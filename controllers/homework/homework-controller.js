const Homework = require('../../models/homework/homeworkSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createHomework = async (req, res) => {
    try {

        const homework = new Homework({
            sclass: req.body.sclass,
            section: req.body.section,
            subjectGroup: req.body.subjectGroup,
            subject: req.body.subject,
            homeworkDate: req.body.homeworkDate,
            submissionDate: req.body.submissionDate,
            maxMarks: req.body.maxMarks,
            attachDocument: req.file.buffer,
            attachDocumentName: req.body.attachDocumentName,
            description: req.body.description,
            school: req.user.school,
        });

        const result = await homework.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.homeworkList = async (req, res) => {
    try {
        const { sclassName, section, subjectGroup, subject } = req.params

        let homeworks = await Homework.find({
            school: req.user.school,
            sclass: sclassName,
            section: section,
            subjectGroup: subjectGroup,
            subject: subject,
        })
            .collation({ locale: "en" })
            .sort({ homeworkDate: 1 })
            .populate("subject", "subName")
            .populate("subjectGroup", "subjectGroupName")
            .populate("section", "sectionName")
            .populate("sclass", "sclassName")

        if (homeworks.length > 0) {
            res.send(homeworks)
        } else {
            res.send({ message: "No Homework  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.dailyAssignmentList = async (req, res) => {
    try {
        const { sclassName, section, subjectGroup, subject, date } = req.params

        let homeworks = await Homework.find({
            school: req.user.school,
            sclass: sclassName,
            section: section,
            subjectGroup: subjectGroup,
            subject: subject,
            homeworkDate: date,
        })
            .collation({ locale: "en" })
            .sort({ homeworkDate: 1 })
            .populate("subject", "subName")
            .populate("subjectGroup", "subjectGroupName")
            .populate("section", "sectionName")
            .populate("sclass", "sclassName")

        if (homeworks.length > 0) {
            res.send(homeworks)
        } else {
            res.send({ message: "No Homework  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateHomework = async (req, res) => {
    try {
        const { id } = req.params;

        const existingHomework = await Homework.findOne({
            _id: { $ne: id },
            Homework: new RegExp(`^${req.body.Homework}$`, 'i'),
            school: req.user.school
        });

        if (existingHomework) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  Homework is not allowed.' });
        }

        // Update the Homework
        const result = await Homework.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};


exports.searchHomework = async (req, res) => {
    try {
        const data = req.params.Homework;
        const result = await Homework.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteHomework = async (req, res) => {
    try {
        const result = await Homework.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}