const FeesGroup = require('../../models/feesCollection/feesGroupSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createFeesGroup = async (req, res) => {
    try {
            //  FeesGroupName already exists
        const existingFeesGroupName = await FeesGroup.findOne({
            name: req.body.name,
            school: req.user.school
        });

        if (existingFeesGroupName) {
            return res.send({ message: "Duplicate  FeesGroupName is not allowed." });
        }
     

        //create new 
        const feesGroup = new FeesGroup({
            ...req.body,
            school: req.user.school
        });

        const result = await feesGroup.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.feesGroupList = async (req, res) => {
    try {
        let feesGroups = await FeesGroup.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ name: -1 })

        if (feesGroups.length > 0) {
            res.send(feesGroups)
        } else {
            res.send({ message: "No FeesGroup  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateFeesGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const existingFeesGroup = await FeesGroup.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingFeesGroup) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  FeesGroup is not allowed.' });
        }

        // Update the FeesGroup
        const result = await FeesGroup.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchFeesGroup = async (req, res) => {
    try {
        const data = req.params;
        const result = await FeesGroup.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        sendErrorResponse(res, err);
    }
}

exports.deleteFeesGroup = async (req, res) => {
    try {
        const result = await FeesGroup.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}