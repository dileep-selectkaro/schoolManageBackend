const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/userRelated/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/userRelated/teacherSchema.js');
const { formatName } = require('../utils/quickFunctions.js');

// exports.sclassCreate = async (req, res) => {
//     try {
//         const sclass = new Sclass({
//             ...req.body,
//             school: req.user.school
//         });

//         const existingSclassByName = await Sclass.findOne({
//             sclassName: req.body.sclassName,
//             school: req.user.school
//         });

//         if (existingSclassByName) {
//             res.send({ message: 'Sorry this class name already exists' });
//         }
//         else {
//             const result = await sclass.save();
//             res.send(result);
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// };



//=========== create=============
exports.sclassCreate = async (req, res) => {
    try {
        const { sclassName } = req.body;
        const schoolId = req.user.school;

        const existingSclassByName = await Sclass.findOne({
            sclassName: { $regex: new RegExp(`^${sclassName}$`, 'i') },
            school: schoolId
        });
        if (existingSclassByName) {
            return res.status(400).send({ message: 'Class name already exists.' });
        } else {

            const sclass = new Sclass({
                ...req.body,
                school: schoolId
            });
            const result = await sclass.save();
            res.send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.allSclassList = async (req, res) => {
    try {
        let sclasses = await Sclass.find({
            school: req.user.school,
        })
            .populate("sections", "sectionName")

        if (sclasses.length > 0) {
            res.send(sclasses)
        } else {
            res.send({ message: "No sclasses found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.sclassList = async (req, res) => {
    try {
        let sclasses = await Sclass.find({ school: req.params.id })
        if (sclasses.length > 0) {
            res.send(sclasses)
        } else {
            res.send({ message: "No sclasses found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.classSectionList = async (req, res) => {
    try {
        let sclass = await Sclass.findById(req.params.id)
            .populate("sections", "sectionName")

        const classSections = sclass?.sections

        if (classSections.length > 0) {
            res.send(classSections);
        }
        else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getSclassDetail = async (req, res) => {
    try {
        let sclass = await Sclass.findById(req.params.id);
        ;
        if (sclass) {
            sclass = await sclass.populate("school", "schoolName")
            res.send(sclass);
        }
        else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getSclassStudents = async (req, res) => {
    try {
        let students = await Student.find({ sclassName: req.params.id }).populate("sclassName", "sclassName")
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return {
                    ...student._doc,
                    password: undefined,
                    name: formatName(student?.studentName)
                };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.sclassSectionStudentList = async (req, res) => {
    try {

        const { classID, sectionID } = req.params

        let students = await Student.find({
            sclassName: classID,
            section: sectionID
        })
            .populate("sclassName", "sclassName")
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return {
                    ...student._doc,
                    password: undefined,
                    name: formatName(student?.studentName)
                };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteSclass = async (req, res) => {
    try {
        const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.send({ message: "Class not found" });
        }
        const deletedStudents = await Student.deleteMany({ sclassName: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ teachSclass: req.params.id });
        res.send(deletedClass);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteSclasses = async (req, res) => {
    try {
        const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            return res.send({ message: "No classes found to delete" });
        }
        const deletedStudents = await Student.deleteMany({ school: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
        res.send(deletedClasses);
    } catch (error) {
        res.status(500).json(error);
    }
}

// exports.sclassUpdate = async (req, res) => {
//     try {
//         let result = await Sclass.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true })

//         res.send(result)

//     } catch (error) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// }

// =========== update class===============
exports.sclassUpdate = async (req, res) => {
    try {
        const { sclassName } = req.body;
        const sclassId = req.params.id;
        const schoolId = req.user.school;
        const existingSclass = await Sclass.findOne({
            _id: { $ne: sclassId }, // Exclude the current class from the search
            sclassName: { $regex: new RegExp(`^${sclassName}$`, 'i') },
            school: schoolId
        });

        if (existingSclass) {
            return res.status(400).json({ message: 'class name already exists.' });
        }

        let result = await Sclass.findByIdAndUpdate(
            sclassId,
            { $set: req.body },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


exports.searchClass = async (req, res) => {
    try {
        const sclassName = req.params.sclassName;
        const result = await Sclass.findOne({ sclassName });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Class not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}