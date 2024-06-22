const ExamGroup = require('../models/examGroupSchema.js');

exports.examGroupCreate = async (req, res) => {
    try {
        const examGroup = new ExamGroup({
            ...req.body,
            school: req.user.school
        });
        

        const result = await examGroup.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.examGroupList = async (req, res) => {
    try {
        let examGroups = await ExamGroup.find({ school: req.user.school }).collation({ locale: "en" }).sort({ examGroupName: 1 });


        if (examGroups.length > 0) {
            res.send(examGroups)
        } else {
            res.send({ message: "No exam groups found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.examGroupUpdate = async (req, res) => {
    try {
        let result = await ExamGroup.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}