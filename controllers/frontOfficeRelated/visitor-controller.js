const Visitor = require('../../models/frontOfficeRelated/visitorSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createVisitor = async (req, res) => {
    try {
        const book = new Visitor({
            ...req.body,
            school: req.user.school
        });

        const result = await book.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.visitorList = async (req, res) => {
    try {
        let book = await Visitor.find({ school: req.user.school }).collation({ locale: "en" }).sort({ date: -1 })
            .populate("purpose", "purposeName")

        if (book.length > 0) {
            res.send(book)
        } else {
            res.send({ message: "No book found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateVisitor = async (req, res) => {
    try {
        let result = await Visitor.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.searchVisitor = async (req, res) => {
    try {
        const data = req.params.name;
        const result = await Visitor.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteVisitor = async (req, res) => {
    try {
        const result = await Visitor.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}