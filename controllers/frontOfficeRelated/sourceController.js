const Source = require("../../models/frontOfficeRelated/sourceSchema");

//==========create Source =============
exports.sourceCreate = async (req, res) => {
    try {
        const sources = req.body.sources;
        const schoolId = req.user.school;
        const newSources = sources.map(source => ({
            ...source,
            school: schoolId
        }));

        // check duplicate sourceName in the provided input, ignoring case
        const sourceNames = newSources.map(source => new RegExp(`^${source.sourceName}$`, 'i'));

        const existingSources = await Source.find({
            school: schoolId,
            sourceName: { $in: sourceNames }
        });

        if (existingSources.length > 0) {
            // Source names are duplicates
            const existingSourceNames = existingSources.map(sec => sec.sourceName);
            return res.status(400).json({
                message: "Duplicate source names are not allowed.",
                duplicates: existingSourceNames
            });
        }

        // Insert if there are no duplicates
        const result = await Source.insertMany(newSources);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.sourceList = async (req, res) => {
    try {
        let sources = await Source.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ sourceName: 1 });
       
        if (sources.length > 0) {
            res.send(sources)
        } else {
            res.send({ message: "No sources found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

//=================== update SourceName=================
exports.updateSource = async (req, res) => {
    try {
        const { sourceName } = req.body;
        const schoolId = req.user.school;

        // Check if the provided sourceName already exists in same school
        const existingSource = await Source.findOne({
            school: schoolId,
            sourceName: sourceName,
            sourceName: new RegExp(`^${sourceName}$`, 'i'), // Case-insensitive match
            _id: { $ne: req.params.id } 
        });

        if (existingSource) {
            return res.status(400).json({
                message: "Already exists SourceName in the same school."
            });
        }

        const updatedSource = await Source.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.send(updatedSource);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.deleteSource = async (req, res) => {
    try {
        const deletedSource = await Source.findByIdAndDelete(req.params.id);

        if (deletedSource) {
            res.send({ success: "Source deleted successfully." });
        } else {
            res.status(404).json({ message: "Source not found." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};