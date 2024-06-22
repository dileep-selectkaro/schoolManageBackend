const Postal = require('../../models/frontOfficeRelated/postalSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createPostal = async (req, res) => {
    try {
        const data = new Postal({
            ...req.body,
            school: req.user.school
        });

        const result = await data.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.postalList = async (req, res) => {
    try {
        let data = await Postal.find({
            school: req.user.school,
            postalType: req.params.postalType
        })
            .collation({ locale: "en" })
            .sort({ title: 1 });

        if (data.length > 0) {
            res.send(data)
        } else {
            res.send({ message: "No data found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updatePostal = async (req, res) => {
    try {
        let result = await Postal.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.searchPostal = async (req, res) => {
    try {
        const data = req.body;
        const result = await Postal.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deletePostal = async (req, res) => {
    try {
        const result = await Postal.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}