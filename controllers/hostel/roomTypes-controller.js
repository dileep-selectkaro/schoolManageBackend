const RoomType = require("../../models/hostel/roomTypeSchema");
const { sendErrorResponse } = require("../../utils/responseHandler");

//==========create RoomType =============
exports.roomTypeCreate = async (req, res) => {
    try {
        const roomTypes = req.body.roomTypes;
        const schoolId = req.user.school;
        const newRoomTypes = roomTypes.map(roomType => ({
            ...roomType,
            school: schoolId
        }));

        // check duplicate roomTypeName in the provided input, ignoring case
        const roomTypeNames = newRoomTypes.map(roomType => new RegExp(`^${roomType.roomTypeName}$`, 'i'));

        const existingRoomTypes = await RoomType.find({
            school: schoolId,
            roomTypeName: { $in: roomTypeNames }
        });

        if (existingRoomTypes.length > 0) {
            // RoomType names are duplicates
            const existingRoomTypeNames = existingRoomTypes.map(sec => sec.roomTypeName);
            return res.status(400).json({
                message: "Duplicate roomType names are not allowed.",
                duplicates: existingRoomTypeNames
            });
        }

        // Insert if there are no duplicates
        const result = await RoomType.insertMany(newRoomTypes);
        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.roomTypeList = async (req, res) => {
    try {
        let roomTypes = await RoomType.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ roomTypeName: 1 });
       
        if (roomTypes.length > 0) {
            res.send(roomTypes)
        } else {
            res.send({ message: "No roomTypes found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

//=================== update RoomTypeName=================
exports.updateRoomType = async (req, res) => {
    try {
        const { roomTypeName } = req.body;
        const schoolId = req.user.school;

        // Check if the provided roomTypeName already exists in same school
        const existingRoomType = await RoomType.findOne({
            school: schoolId,
            roomTypeName: roomTypeName,
            roomTypeName: new RegExp(`^${roomTypeName}$`, 'i'), // Case-insensitive match
            _id: { $ne: req.params.id } 
        });

        if (existingRoomType) {
            return res.status(400).json({
                message: "Already exists RoomTypeName in the same school."
            });
        }

        const updatedRoomType = await RoomType.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.send(updatedRoomType);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.deleteRoomType = async (req, res) => {
    try {
        const deletedRoomType = await RoomType.findByIdAndDelete(req.params.id);

        if (deletedRoomType) {
            res.send({ success: "RoomType deleted successfully." });
        } else {
            res.status(404).json({ message: "RoomType not found." });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};