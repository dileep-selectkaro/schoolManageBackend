const AdmissionEnquiry = require('../../models/frontOfficeRelated/admissionEnquirySchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createAdmissionEnquiry = async (req, res) => {
    try {
        const book = new AdmissionEnquiry({
            ...req.body,
            school: req.user.school
        });

        const result = await book.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.admissionEnquiryList = async (req, res) => {
    try {
        const { sclass, source, admissionEnquiryStatus } = req.params

        let book = await AdmissionEnquiry.find({
            school: req.user.school,
            sclass: sclass,
            source: source,
            admissionEnquiryStatus: admissionEnquiryStatus,
        })
            .collation({ locale: "en" }).sort({ name: 1 })
            .populate("source", "sourceName")
            .populate("sclass", "sclassName")

        if (book.length > 0) {
            res.send(book)
        } else {
            res.send({ message: "No books found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateAdmissionEnquiry = async (req, res) => {
    try {
        let result = await AdmissionEnquiry.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.searchAdmissionEnquiry = async (req, res) => {
    try {
        const data = req.body;
        const result = await AdmissionEnquiry.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteAdmissionEnquiry = async (req, res) => {
    try {
        const result = await AdmissionEnquiry.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}