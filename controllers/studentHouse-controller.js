const StudentHouse = require('../models/studentHouseSchema');
const { sendErrorResponse } = require('../utils/responseHandler');

exports.createStudentHouse = async (req, res) => {
    try {
        const studentHouses = req.body.studentHouses;
        const schoolId = req.user.school;
        const newStudentHouses = studentHouses.map(studentHouse => ({
            ...studentHouse,
            school: schoolId
        }));

        // check duplicate studentHouseName in the provided input, ignoring case
        const studentHouseNames = newStudentHouses.map(studentHouse => new RegExp(`^${studentHouse.studentHouseName}$`, 'i'));

        const existingStudentHousesbyName = await StudentHouse.find({
            school: schoolId,
            studentHouseName: { $in: studentHouseNames }
        });

        if (existingStudentHousesbyName.length > 0) {
            // StudentHouse names are duplicates
            const existingStudentHouseNames = existingStudentHousesbyName.map(sec => sec.studentHouseName);
            return res.status(400).json({
                message: "Duplicate studentHouse names are not allowed.",
                duplicates: existingStudentHouseNames
            });
        }

        // check duplicate studentHouseId in the provided input, ignoring case
        const studentHouseIds = newStudentHouses.map(studentHouse => new RegExp(`^${studentHouse.studentHouseId}$`, 'i'));

        const existingStudentHousesbyId = await StudentHouse.find({
            school: schoolId,
            studentHouseId: { $in: studentHouseIds }
        });

        if (existingStudentHousesbyId.length > 0) {
            // StudentHouse ids are duplicates
            const existingStudentHouseIds = existingStudentHousesbyId.map(sec => sec.studentHouseId);
            return res.status(400).json({
                message: "Duplicate studentHouse ids are not allowed.",
                duplicates: existingStudentHouseIds
            });
        }

        // Insert if there are no duplicates
        const result = await StudentHouse.insertMany(newStudentHouses);
        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.studentHouseList = async (req, res) => {
    try {
        let data = await StudentHouse.find({ school: req.user.school })
            .sort({ studentHouseId: 1 });

        if (data.length > 0) {
            res.send(data)
        } else {
            res.send({ message: "No data found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateStudentHouse = async (req, res) => {
    try {
        let result = await StudentHouse.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}


exports.searchStudentHouse = async (req, res) => {
    try {
        const data = req.body;
        const result = await StudentHouse.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteStudentHouse = async (req, res) => {
    try {
        const result = await StudentHouse.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}