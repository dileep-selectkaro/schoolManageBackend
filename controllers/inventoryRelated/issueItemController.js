const IssueItem = require('../../models/inventoryRelated/issueItemSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createIssueItem = async (req, res) => {
    try {
        const data = new IssueItem({
            ...req.body,
            school: req.user.school
        });

        const result = await data.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.issuedItemList = async (req, res) => {
    try {
        let data = await IssueItem.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ name: 1 })
            .populate("issuedTo", "-password")
            .populate("issuedBy", "-password")
            .populate("itemCategory", "itemCategoryName")
            .populate("item", "itemName")

        if (data.length > 0) {
            res.send(data)
        } else {
            res.send({ message: "No data found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateIssueItem = async (req, res) => {
    try {
        let result = await IssueItem.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.searchIssueItem = async (req, res) => {
    try {
        const data = req.body;
        const result = await IssueItem.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteIssueItem = async (req, res) => {
    try {
        const result = await IssueItem.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}