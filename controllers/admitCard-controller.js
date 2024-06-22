const AdmitCard = require('../models/admitCardSchema.js');
const Student = require('../models/userRelated/studentSchema.js');
const { formatName } = require('../utils/quickFunctions.js');

exports.admitCardCreate = async (req, res) => {
    try {
        const admitCard = new AdmitCard({
            ...req.body,
            school: req.user.school
        });

        const result = await admitCard.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.allAdmitCardList = async (req, res) => {
    try {
        let admitCards = await AdmitCard.find({ school: req.user.school })
            .collation({ locale: "en" }) 
            .sort({ certificateName: 1 }) 
            .populate("examinationName", "examName")
            .populate("school", "schoolName");

        if (admitCards.length > 0) {
            res.send(admitCards);
        } else {
            res.send({ message: "No admit cards found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.admitCardPrintDetails = async (req, res) => {
    try {
        const { studentID, acID }  = req.params

        let admitCard = await AdmitCard.findById(acID)
            .populate("examinationName", "examName")
            .populate("school", "schoolName")

        let student = await Student.findById(studentID)
            .populate("sclassName", "sclassName")
            .populate("school", "schoolName")
            .populate("section", "sectionName")

        if (admitCard && student) {
            res.send({
                ...admitCard.toObject(),
                ...student.toObject(),
                name: formatName(student?.studentName)
             })
        } else {
            res.send({ message: "No admit card found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.admitCardUpdate = async (req, res) => {
    try {
        let result = await AdmitCard.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }).collation({ locale: "en" }).sort({ certificateName: 1 })


        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}