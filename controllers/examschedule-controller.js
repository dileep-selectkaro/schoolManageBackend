const ExamSchedule = require('../models/examScheduleSchema.js');

exports.examScheduleCreate = async (req, res) => {
    try {
        const findedExamDetails = await ExamSchedule.findOne({
            examGroup: req.body.examGroup,
            examinationType: req.body.examinationType,
            school: req.user.school,
        });

        if (findedExamDetails) {
            return res.send({ message: "This already exists edit that in the timetable" });
        }
        else {
            const examSchedule = new ExamSchedule({
                ...req.body,
                school: req.user.school,
            });

            const result = await examSchedule.save();
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.examScheduleList = async (req, res) => {
    try {
        const { examGroup, examinationType } = req.params;

        let examSchedule = await ExamSchedule.findOne({
            examGroup: examGroup,
            examinationType: examinationType,
            school: req.user.school,
        })
            .populate("examDetails.examSubject", "subName")
        if (examSchedule) {
            res.send(examSchedule)
        } else {
            res.send({ message: "No exam schedules found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.examSubjectList = async (req, res) => {
    try {
        const { examGroup, examinationType } = req.params;

        const examSchedule = await ExamSchedule.findOne({
            examGroup: examGroup,
            examinationType: examinationType,
            school: req.user.school,
        })
            .populate("examDetails.examSubject", "subName subCode");

        if (!examSchedule) {
            return res.send({ message: "No exam schedule found" });
        }

        const examSubjects = examSchedule?.examDetails?.map(detail => ({
            _id: detail?.examSubject?._id,
            subName: detail?.examSubject?.subName,
            examMinMarks: detail?.examMinMarks,
            examMaxMarks: detail?.examMaxMarks,
            subDetail: `${detail?.examSubject?.subName} (${detail?.examMinMarks}/${detail?.examMaxMarks} - ${detail?.examSubject?.subCode})`
        }));

        if (examSubjects.length > 0) {
            res.send(examSubjects);
        } else {
            res.send({ message: "No exam subjects found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.admitCardExamScheduleList = async (req, res) => {
    try {
        let examSchedule = await ExamSchedule.findOne({
            examinationType: req.params.examinationType,
            school: req.user.school,
        })
            .populate({
                path: 'examDetails.examSubject',
                select: 'subName subCode subType',
            })
        if (examSchedule) {
            res.send(examSchedule)
        } else {
            res.send({ message: "No exam schedules found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.examScheduleUpdate = async (req, res) => {
    try {

        const examDetails = req.body;

        const examSchedule = await ExamSchedule.findById(req.params.id);

        if (!examSchedule) {
            return res.send({ message: 'Exam Schedule not found' });
        }

        examSchedule.examDetails = examDetails;

        const result = await examSchedule.save();

        res.send(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};