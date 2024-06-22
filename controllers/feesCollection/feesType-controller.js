const FeesType = require('../../models/feesCollection/feesTypeSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createFeesType = async (req, res) => {
    try {
            //  FeesTypeName already exists
        const existingFeesTypeName = await FeesType.findOne({
            name: req.body.name,
            school: req.user.school
        });

        if (existingFeesTypeName) {
            return res.send({ message: "Duplicate  FeesTypeName is not allowed." });
        }
     

        //create new 
        const FeesType = new FeesType({
            ...req.body,
            school: req.user.school
        });

        const result = await FeesType.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.feesTypeList = async (req, res) => {
    try {
        let feesTypes = await FeesType.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ name: -1 })

        if (feesTypes.length > 0) {
            res.send(feesTypes)
        } else {
            res.send({ message: "No FeesType  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateFeesType = async (req, res) => {
    try {
        const { id } = req.params;

        const existingFeesType = await FeesType.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingFeesType) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  FeesType is not allowed.' });
        }

        // Update the FeesType
        const result = await FeesType.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchFeesType = async (req, res) => {
    try {
        const data = req.params;
        const result = await FeesType.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        sendErrorResponse(res, err);
    }
}

exports.deleteFeesType = async (req, res) => {
    try {
        const result = await FeesType.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}