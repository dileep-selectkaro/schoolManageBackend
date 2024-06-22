const ClassRoutine = require('../models/classRoutineSchema');
const Sclass = require('../models/sclassSchema');
const Section = require('../models/sectionSchema');
const Student = require('../models/userRelated/studentSchema');
const SubjectGroup = require('../models/subjectGroupSchema');

// exports.sectionCreate = async (req, res) => {
//     try {
//         const sections = req.body.sections;

//         const newSections = sections.map((section) => ({
//             ...section,
//             school: req.user.school
//         }));

//         const result = await Section.insertMany(newSections);
//         res.send(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// };

//==========create Section =============
exports.sectionCreate = async (req, res) => {
    try {
        const sections = req.body.sections;
        const schoolId = req.user.school;
        const newSections = sections.map(section => ({
            ...section,
            school: schoolId
        }));

        // check duplicate sectionName in the provided input, ignoring case
        const sectionNames = newSections.map(section => new RegExp(`^${section.sectionName}$`, 'i'));

        const existingSections = await Section.find({
            school: schoolId,
            sectionName: { $in: sectionNames }
        });

        if (existingSections.length > 0) {
            // Section names are duplicates
            const existingSectionNames = existingSections.map(sec => sec.sectionName);
            return res.status(400).json({
                message: "Duplicate section names are not allowed.",
                duplicates: existingSectionNames
            });
        }

        // Insert if there are no duplicates
        const result = await Section.insertMany(newSections);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};





exports.sectionList = async (req, res) => {
    try {
        let sections = await Section.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ sectionName: 1 });
       
        if (sections.length > 0) {
            res.send(sections)
        } else {
            res.send({ message: "No sections found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

//=================search Section==============
// exports.updateSection = async (req, res) => {
//     try {
//         const result = await Section.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true })
//         res.send(result)
//     } catch (error) {
//         console.log(err);
//         res.status(500).json(error);
//     }
// }

//=================== update SectionName=================
exports.updateSection = async (req, res) => {
    try {
        const { sectionName } = req.body;
        const schoolId = req.user.school;

        // Check if the provided sectionName already exists in same school
        const existingSection = await Section.findOne({
            school: schoolId,
            sectionName: sectionName,
            sectionName: new RegExp(`^${sectionName}$`, 'i'), // Case-insensitive match
            _id: { $ne: req.params.id } 
        });

        if (existingSection) {
            return res.status(400).json({
                message: "Already exists SectionName in the same school."
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.send(updatedSection);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


exports.deleteSection = async (req, res) => {
    try {
        const deletedSection = await Section.findByIdAndDelete(req.params.id);

        if (deletedSection) {
            await Sclass.updateMany(
                { sections: req.params.id }, 
                { $pull: { sections: req.params.id } }
            );

            await SubjectGroup.updateMany(
                { sections: req.params.id }, 
                { $pull: { sections: req.params.id } }
            );

            // await ClassRoutine.updateMany(
            //     { section: req.params.id },
            //     { $set: { section: null } }
            // );

            await ClassRoutine.deleteMany({ section: req.params.id });

            await Student.updateMany(
                { section: req.params.id },
                { $set: { section: null } }
            );

            res.send({ success: "Section deleted successfully." });
        } else {
            res.status(404).json({ message: "Section not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// exports.searchSection = async (req, res) => {
//     try {
//         const sectionName = req.params.sectionName; 
//         const result = await Section.findOne({ sectionName }); 
//         if (result) {
//             res.status(200).json({ success: true, data: result });
//         } else {
//             res.status(404).json({ success: false, message: 'Section not found' });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// }