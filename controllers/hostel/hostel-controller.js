const Hostel = require('../../models/hostel/hostelSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createHostel = async (req, res) => {
    try {
        //  Hostel already exists
        const existingHostel = await Hostel.findOne({
            hostelName: req.body.hostelName,
            school: req.user.school
        });

        if (existingHostel) {
            return res.send({ message: "Duplicate  Hostel is not allowed." });
        }

        // Create a new  Hostel
        const hostel = new Hostel({
            ...req.body,
            school: req.user.school
        });

        const result = await hostel.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.hostelList = async (req, res) => {
    try {
        let hostel = await Hostel.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ hostelName: 1 })

        if (hostel.length > 0) {
            res.send(hostel)
        } else {
            res.send({ message: "No Hostel  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateHostel = async (req, res) => {
    try {
        const { id } = req.params;

        const existingHostel = await Hostel.findOne({
            _id: { $ne: id },
            Hostel: new RegExp(`^${req.body.Hostel}$`, 'i'),
            school: req.user.school
        });

        if (existingHostel) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  Hostel is not allowed.' });
        }

        // Update the Hostel
        const result = await Hostel.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchHostel = async (req, res) => {
    try {
        const data = req.params.hostel;
        const result = await Hostel.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteHostel = async (req, res) => {
    try {
        const result = await Hostel.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}