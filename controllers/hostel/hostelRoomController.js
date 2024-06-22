const HostelRoom = require('../../models/hostel/hostelRoomSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createHostelRoom = async (req, res) => {
    try {
        //  HostelRoom already exists
        const existingHostelRoom = await HostelRoom.findOne({
            hostelRoomName: req.body.hostelRoomName,
            school: req.user.school
        });

        if (existingHostelRoom) {
            return res.send({ message: "Duplicate  HostelRoom is not allowed." });
        }

        // Create a new  HostelRoom
        const hostelRoom = new HostelRoom({
            ...req.body,
            school: req.user.school
        });

        const result = await hostelRoom.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.hostelRoomList = async (req, res) => {
    try {
        let hostelRooms = await HostelRoom.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ hostelRoomName: -1 })

            .populate("hostel", "hostelName")
            .populate("roomType", "roomTypeName")

        if (hostelRooms.length > 0) {
            res.send(hostelRooms)
        } else {
            res.send({ message: "No HostelRoom  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateHostelRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const existingHostelRoom = await HostelRoom.findOne({
            _id: { $ne: id },
            HostelRoom: new RegExp(`^${req.body.HostelRoom}$`, 'i'),
            school: req.user.school
        });

        if (existingHostelRoom) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  HostelRoom is not allowed.' });
        }

        // Update the HostelRoom
        const result = await HostelRoom.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchHostelRoom = async (req, res) => {
    try {
        const data = req.params.HostelRoom;
        const result = await HostelRoom.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteHostelRoom = async (req, res) => {
    try {
        const result = await HostelRoom.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}