const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/userRelated/teacherSchema.js');
const Student = require('../models/userRelated/studentSchema.js');

exports.subjectCreate = async (req, res) => {
    try {
        const subjects = req.body.subjects;

        // Check if subCodes in the subjects array are unique
        const uniqueSubCodes = new Set(subjects.map(subject => subject.subCode));
        if (uniqueSubCodes.size !== subjects.length) {
            return res.send({ message: 'SubCodes must be unique within the request.' });
        }

        for (const subject of subjects) {
            // Check if a similar subject with the same subCode and schoolID exists in the database
            const existingSubjectBySubCode = await Subject.findOne({
                subCode: subject.subCode,
                school: req.user.school,
            });

            if (existingSubjectBySubCode) {
                return res.send({ message: 'Sorry but this subCode already exists.' });
            }
        }

        // Proceed to create new Subject documents
        const newSubjects = subjects.map((subject) => ({
            ...subject,
            school: req.user.school
        }));

        const result = await Subject.insertMany(newSubjects);
        res.send(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.allSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ school: req.params.id })  

        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.classSubjectList = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id })

        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.subjectList = async (req, res) => {
    try {
        let subjects = await Subject.find({ school: req.user.school }).collation({ locale: "en" }).sort({ subName: 1 });

        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.subjectDetails = async (req, res) => {
    try {
        let subject = await Subject.findById(req.params.id);
        if (subject) {
            res.send(subject);
        }
        else {
            res.send({ message: "No subject found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

        // Set the teachSubject field to null in teachers
        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Remove the objects containing the deleted subject from students' examResult array
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id } } }
        );

        // Remove the objects containing the deleted subject from students' attendance array
        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedSubject._id } } }
        );

        res.send(deletedSubject);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deleteSubjects = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.subjectUpdate = async (req, res) => {
    try {
        let result = await Subject.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}