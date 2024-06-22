const FeesDiscount = require('../../models/feesCollection/feesDiscountSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createFeesDiscount = async (req, res) => {
    try {
            //  FeesDiscountName already exists
        const existingFeesDiscountName = await FeesDiscount.findOne({
            name: req.body.name,
            school: req.user.school
        });

        if (existingFeesDiscountName) {
            return res.send({ message: "Duplicate  FeesDiscountName is not allowed." });
        }
     

        //create new..
        const feesDiscount = new FeesDiscount({
            ...req.body,
            school: req.user.school
        });

        const result = await feesDiscount.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.feesDiscountList = async (req, res) => {
    try {
        let feesDiscounts = await FeesDiscount.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ name: -1 })

        if (feesDiscounts.length > 0) {
            res.send(feesDiscounts)
        } else {
            res.send({ message: "No FeesDiscount  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateFeesDiscount = async (req, res) => {
    try {
        const { id } = req.params;

        const existingFeesDiscount = await FeesDiscount.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.schoolkab 
        });

        if (existingFeesDiscount) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  FeesDiscount is not allowed.' });
        }

        // Update the FeesDiscount
        const result = await FeesDiscount.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchFeesDiscount = async (req, res) => {
    try {
        const data = req.params;
        const result = await FeesDiscount.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        sendErrorResponse(res, err);
    }
}

exports.deleteFeesDiscount = async (req, res) => {
    try {
        const result = await FeesDiscount.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}