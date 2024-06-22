const StudentCategory = require('../models/studentCategoriesSchema');

exports.createStudentCategory = async (req, res) => {
    try {
        const data = new StudentCategory({
            ...req.body,
            school: req.user.school
        });
    
        const result = await data.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.listStudentCategory = async (req, res) => {
    try {
        let data = await StudentCategory.find({ school: req.user.school }).collation({ locale: "en" }).sort({ category: 1 });


        if (data.length > 0) {
            res.send(data)
        } else {
            res.send({ message: "No data found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.updateStudentCategory = async (req, res) => {
    try {
        let result = await StudentCategory.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}


exports.searchStudentCategory = async (req, res) => {
    try {
        const data = req.body;
        const result = await StudentCategory.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.deleteStudentCategory = async (req, res) => {
    try {
        const result = await StudentCategory.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}