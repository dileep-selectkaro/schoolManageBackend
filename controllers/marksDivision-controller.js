const MarksDivision = require('../models/marksDivisionSchema');

exports.marksDivisionCreate = async (req, res) => {
    try {
        const marksDivision = new MarksDivision({
            ...req.body,
            school: req.user.school,
        })

        const result = await marksDivision.save()
        res.send(result)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.marksDivisionList = async (req, res) => {
    try {
        let marksDivisions = await MarksDivision.find({ school: req.user.school }).collation({ locale: "en" }).sort({ marksDivisionName: 1 })
        ;

        if (marksDivisions.length > 0) {
            res.send(marksDivisions);
        } else {
            res.send({ message: "No Marks Divisions found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.updateMarksDivision = async (req, res) => {
    try {
        const result = await MarksDivision.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }).collation({ locale: "en" }).sort({ marksDivisionName: 1 })
        res.send(result)
    } catch (error) {
        console.log(err);
        res.status(500).json(error);
    }
}

exports.deleteMarksDivision = async (req, res) => {
    try {
        const result = await MarksDivision.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteMarksDivisions = async (req, res) => {
    try {
        const result = await MarksDivision.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No Marks Division found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}
