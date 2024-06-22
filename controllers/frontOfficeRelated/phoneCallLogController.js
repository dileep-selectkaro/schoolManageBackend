const PhoneCallLog = require('../../models/frontOfficeRelated/phoneCallLogSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createPhoneCallLog = async (req, res) => {
    try {
        const data = new PhoneCallLog({
            ...req.body,
            school: req.user.school
        });

        const result = await data.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.phoneCallLogList = async (req, res) => {
    try {
        let data = await PhoneCallLog.find({ school: req.user.school }).collation({ locale: "en" }).sort({ name: 1 });

        if (data.length > 0) {
            res.send(data)
        } else {
            res.send({ message: "No data found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updatePhoneCallLog = async (req, res) => {
    try {
        let result = await PhoneCallLog.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.searchPhoneCallLog = async (req, res) => {
    try {
        const data = req.body;
        const result = await PhoneCallLog.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deletePhoneCallLog = async (req, res) => {
    try {
        const result = await PhoneCallLog.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}