const Lesson = require('../../models/lessonPlan/lessonSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createLesson = async (req, res) => {
    try {
            //  lessonName already exists
        const existingLessonName = await Lesson.findOne({
            lessonName: req.body.lessonName,
            school: req.user.school
        });

        if (existingLessonName) {
            return res.send({ message: "Duplicate  lessonName is not allowed." });
        }
     

        //create new 
        const lesson = new Lesson({
            ...req.body,
            school: req.user.school
        });

        const result = await lesson.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.lessonList = async (req, res) => {
    try {
        let lessons = await Lesson.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ lessonName: -1 }).populate("sclass", "sclass").populate("section","section").populate("subjectGroup","subjectGroup").populate("subject","subject")

        if (lessons.length > 0) {
            res.send(lessons)
        } else {
            res.send({ message: "No Lesson  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateLesson = async (req, res) => {
    try {
        const { id } = req.params;

        const existingLesson = await Lesson.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingLesson) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  Lesson is not allowed.' });
        }

        // Update the Lesson
        const result = await Lesson.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchLesson = async (req, res) => {
    try {
        const data = req.params;
        const result = await Lesson.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        sendErrorResponse(res, err);
    }
}

exports.deleteLesson = async (req, res) => {
    try {
        const result = await Lesson.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}