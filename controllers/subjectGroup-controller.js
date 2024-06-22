const { default: mongoose } = require('mongoose');
const SubjectGroup = require('../models/subjectGroupSchema.js');

exports.subjectGroupCreate = async (req, res) => {
    try {
        const subjectGroup = new SubjectGroup({
            ...req.body,
            school: req.user.school
        });

        const result = await subjectGroup.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.subjectGroupList = async (req, res) => {
    try {
        let subjectGroups = await SubjectGroup.find({ school: req.user.school })
            .populate("sections", "sectionName")
            .populate("subjects", "subName")
            .populate("sclassName", "sclassName")
            .populate({
                path: 'sclassName',
                select: 'sclassName',
                populate: {
                    path: 'sections',
                    select: 'sectionName',
                }
            })
            .collation({ locale: "en" })
            .sort({ subjectGroupName: 1 })

        if (subjectGroups.length > 0) {
            res.send(subjectGroups)
        } else {
            res.send({ message: "No subject groups found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.specificSubjectGroupList = async (req, res) => {
    try {
        const { sclassName, section } = req.params

        let subjectGroups = await SubjectGroup.find({
            school: req.user.school,
            sclassName: sclassName,
            sections: { $in: [section] },
        })
            .populate("sections", "sectionName")
            .populate("subjects", "subName")
            .populate("sclassName", "sclassName")
            .populate({
                path: 'sclassName',
                select: 'sclassName',
                populate: {
                    path: 'sections',
                    select: 'sectionName',
                }
            })
            .collation({ locale: "en" })
            .sort({ subjectGroupName: 1 })

        if (subjectGroups.length > 0) {
            res.send(subjectGroups)
        } else {
            res.send({ message: "No subject groups found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.subjectGroupUpdate = async (req, res) => {
    try {
        let result = await SubjectGroup.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteSubjectGroup = async (req, res) => {
    try {
        const result = await SubjectGroup.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}