const Reference = require("../../models/frontOfficeRelated/referenceSchema");

//==========create Reference =============
exports.referenceCreate = async (req, res) => {
    try {
        const references = req.body.references;
        const schoolId = req.user.school;
        const newReferences = references.map(reference => ({
            ...reference,
            school: schoolId
        }));

        // check duplicate referenceName in the provided input, ignoring case
        const referenceNames = newReferences.map(reference => new RegExp(`^${reference.referenceName}$`, 'i'));

        const existingReferences = await Reference.find({
            school: schoolId,
            referenceName: { $in: referenceNames }
        });

        if (existingReferences.length > 0) {
            // Reference names are duplicates
            const existingReferenceNames = existingReferences.map(sec => sec.referenceName);
            return res.status(400).json({
                message: "Duplicate reference names are not allowed.",
                duplicates: existingReferenceNames
            });
        }

        // Insert if there are no duplicates
        const result = await Reference.insertMany(newReferences);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.referenceList = async (req, res) => {
    try {
        let references = await Reference.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ referenceName: 1 });
       
        if (references.length > 0) {
            res.send(references)
        } else {
            res.send({ message: "No references found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

//=================== update ReferenceName=================
exports.updateReference = async (req, res) => {
    try {
        const { referenceName } = req.body;
        const schoolId = req.user.school;

        // Check if the provided referenceName already exists in same school
        const existingReference = await Reference.findOne({
            school: schoolId,
            referenceName: referenceName,
            referenceName: new RegExp(`^${referenceName}$`, 'i'), // Case-insensitive match
            _id: { $ne: req.params.id } 
        });

        if (existingReference) {
            return res.status(400).json({
                message: "Already exists ReferenceName in the same school."
            });
        }

        const updatedReference = await Reference.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.send(updatedReference);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deleteReference = async (req, res) => {
    try {
        const deletedReference = await Reference.findByIdAndDelete(req.params.id);

        if (deletedReference) {
            res.send({ success: "Reference deleted successfully." });
        } else {
            res.status(404).json({ message: "Reference not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};