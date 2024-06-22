const FeesMaster = require('../../models/feesCollection/feesMasterSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createFeesMaster = async (req, res) => {
    try {
            // already exists
        const existingFeesMaster = await FeesMaster.findOne({
            data: req.body,
            school: req.user.school
        });

        if (existingFeesMaster) {
            return res.send({ message: "Duplicate FeesMaster content  is not allowed." });
        }
     

        //create new 
        const feesMaster = new FeesMaster({
            ...req.body,
            school: req.user.school
        });

        const result = await feesMaster.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.feesMasterList = async (req, res) => {
    try {
        let feesMasters = await FeesMaster.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({feesGroup: -1 }).populate("feesType", "feesType").populate("feesGroup","feesGroup")

        if (feesMasters.length > 0) {
            res.send(feesMasters)
        } else {
            res.send({ message: "No FeesMaster  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateFeesMaster = async (req, res) => {
    try {
        const { id } = req.params;

        const existingFeesMaster = await FeesMaster.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingFeesMaster) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate FeesMaster is not allowed.' });
        }

        // Update the FeesMaster
        const result = await FeesMaster.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchFeesMaster = async (req, res) => {
    try {
        const data = req.params;
        const result = await FeesMaster.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        sendErrorResponse(res, err);
    }
}

exports.deleteFeesMaster = async (req, res) => {
    try {
        const result = await FeesMaster.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}