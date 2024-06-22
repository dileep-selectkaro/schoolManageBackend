const Exam = require('../models/examSchema.js');

const examCreate = async (req, res) => {
    try {
        const exam = new Exam({
            ...req.body,
            school: req.body.adminID
        })
        const result = await exam.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const examList = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        let exams = await Exam.find({_id: id});  
        if (exams.length > 0) {
            res.send(exams);
        } else {
            res.send({ message: "No exams found" });  
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


const updateExam = async (req, res) => {
    try {
        const result = await Exam.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteExam = async (req, res) => {
    try {
        const result = await Exam.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteExams = async (req, res) => {
    try {
        const result = await Exam.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No Exam found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

module.exports = { examCreate, examList, updateExam, deleteExam, deleteExams };