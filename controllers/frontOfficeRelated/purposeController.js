const Purpose = require("../../models/frontOfficeRelated/purposeSchema");

//==========create Purpose =============
exports.purposeCreate = async (req, res) => {
    try {
        const purposes = req.body.purposes;
        const schoolId = req.user.school;
        const newPurposes = purposes.map(purpose => ({
            ...purpose,
            school: schoolId
        }));

        // check duplicate purposeName in the provided input, ignoring case
        const purposeNames = newPurposes.map(purpose => new RegExp(`^${purpose.purposeName}$`, 'i'));

        const existingPurposes = await Purpose.find({
            school: schoolId,
            purposeName: { $in: purposeNames }
        });

        if (existingPurposes.length > 0) {
            // Purpose names are duplicates
            const existingPurposeNames = existingPurposes.map(sec => sec.purposeName);
            return res.status(400).json({
                message: "Duplicate purpose names are not allowed.",
                duplicates: existingPurposeNames
            });
        }

        // Insert if there are no duplicates
        const result = await Purpose.insertMany(newPurposes);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.purposeList = async (req, res) => {
    try {
        let purposes = await Purpose.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ purposeName: 1 });
       
        if (purposes.length > 0) {
            res.send(purposes)
        } else {
            res.send({ message: "No purposes found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

//=================== update PurposeName=================
exports.updatePurpose = async (req, res) => {
    try {
        const { purposeName } = req.body;
        const schoolId = req.user.school;

        // Check if the provided purposeName already exists in same school
        const existingPurpose = await Purpose.findOne({
            school: schoolId,
            purposeName: purposeName,
            purposeName: new RegExp(`^${purposeName}$`, 'i'), // Case-insensitive match
            _id: { $ne: req.params.id } 
        });

        if (existingPurpose) {
            return res.status(400).json({
                message: "Already exists PurposeName in the same school."
            });
        }

        const updatedPurpose = await Purpose.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.send(updatedPurpose);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deletePurpose = async (req, res) => {
    try {
        const deletedPurpose = await Purpose.findByIdAndDelete(req.params.id);

        if (deletedPurpose) {
            res.send({ success: "Purpose deleted successfully." });
        } else {
            res.status(404).json({ message: "Purpose not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};