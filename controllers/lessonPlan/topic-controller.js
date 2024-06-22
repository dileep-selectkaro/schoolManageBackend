const Topic = require('../../models/lessonPlan/topicSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createTopic = async (req, res) => {
    try {
              //  topicName already exists
              const existingTopicName = await Topic.findOne({
                topicName: req.body.topicName,
                school: req.user.school
            });
    
            if (existingTopicName) {
                return res.send({ message: "Duplicate  topicName is not allowed." });
            }
            
        //create new
        const topic = new Topic({
            ...req.body,
            school: req.user.school
        });

        const result = await topic.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.topicList = async (req, res) => {
    try {
        let topics = await Topic.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ topicName: -1 }).populate("sclass", "sclass").populate("section","section").populate("subjectGroup","subjectGroup").populate("subject","subject").populate("lesson","lesson")

        if (topics.length > 0) {
            res.send(topics)
        } else {
            res.send({ message: "No Topic  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateTopic = async (req, res) => {
    try {
        const { id } = req.params;

        const existingTopic = await Topic.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingTopic) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  Topic is not allowed.' });
        }

        // Update the Topic
        const result = await Topic.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchTopic = async (req, res) => {
    try {
        const data = req.params;
        const result = await Topic.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        sendErrorResponse(res, err);
    }
}

exports.deleteTopic = async (req, res) => {
    try {
        const result = await Topic.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}