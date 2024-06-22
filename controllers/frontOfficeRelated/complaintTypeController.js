const ComplaintType = require("../../models/frontOfficeRelated/complaintTypeSchema");

//==========create ComplaintType =============
exports.complaintTypeCreate = async (req, res) => {
    try {
        const complaintTypes = req.body.complaintTypes;
        const schoolId = req.user.school;
        const newComplaintTypes = complaintTypes.map(complaintType => ({
            ...complaintType,
            school: schoolId
        })); 

        // check duplicate complaintTypeName in the provided input, ignoring case
        const complaintTypeNames = newComplaintTypes.map(complaintType => new RegExp(`^${complaintType.complaintTypeName}$`, 'i'));

        const existingComplaintTypes = await ComplaintType.find({
            school: schoolId,
            complaintTypeName: { $in: complaintTypeNames }
        });

        if (existingComplaintTypes.length > 0) {
            // ComplaintType names are duplicates
            const existingComplaintTypeNames = existingComplaintTypes.map(sec => sec.complaintTypeName);
            return res.status(400).json({
                message: "Duplicate complaintType names are not allowed.",
                duplicates: existingComplaintTypeNames
            });
        }

        // Insert if there are no duplicates
        const result = await ComplaintType.insertMany(newComplaintTypes);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.complaintTypeList = async (req, res) => {
    try {
        let complaintTypes = await ComplaintType.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ complaintTypeName: 1 });
       
        if (complaintTypes.length > 0) {
            res.send(complaintTypes)
        } else {
            res.send({ message: "No complaintTypes found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

//=================== update ComplaintTypeName=================
exports.updateComplaintType = async (req, res) => {
    try {
        const { complaintTypeName } = req.body;
        const schoolId = req.user.school;

        // Check if the provided complaintTypeName already exists in same school
        const existingComplaintType = await ComplaintType.findOne({
            school: schoolId,
            complaintTypeName: complaintTypeName,
            complaintTypeName: new RegExp(`^${complaintTypeName}$`, 'i'), // Case-insensitive match
            _id: { $ne: req.params.id } 
        });

        if (existingComplaintType) {
            return res.status(400).json({
                message: "Already exists ComplaintTypeName in the same school."
            });
        }

        const updatedComplaintType = await ComplaintType.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.send(updatedComplaintType);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deleteComplaintType = async (req, res) => {
    try {
        const deletedComplaintType = await ComplaintType.findByIdAndDelete(req.params.id);

        if (deletedComplaintType) {
            res.send({ success: "ComplaintType deleted successfully." });
        } else {
            res.status(404).json({ message: "ComplaintType not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};