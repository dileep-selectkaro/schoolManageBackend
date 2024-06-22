const IncomeHead = require('../../models/income/incomeHeadSchema');

exports.createIncomeHead = async (req, res) => {
    try {
        //  IncomeHead already exists
        const existingIncomeHead = await IncomeHead.findOne({
            incomeHead: req.body.incomeHead,
            school: req.user.school
        });

        if (existingIncomeHead) {
            return res.status(400).json({ message: "Duplicate  IncomeHead is not allowed." });
        }

        // Create a new  IncomeHead
        const incomeHead = new IncomeHead({
            ...req.body,
            school: req.user.school
        });

        const result = await incomeHead.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.incomeHeadList = async (req, res) => {
    try {
        let incomeHead = await IncomeHead.find({ school: req.user.school }).collation({ locale: "en" }).sort({ incomeHead: -1 })
        if (incomeHead .length > 0) {
            res.send(incomeHead )
        } else {
            res.send({ message: "No IncomeHead  found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.updateIncomeHead = async (req, res) => {
    try {
        const { id } = req.params;

        const existingIncomeHead = await IncomeHead.findOne({
            _id: { $ne: id }, 
            incomeHead: new RegExp(`^${req.body.incomeHead}$`, 'i'), 
            school: req.user.school
        });

        if (existingIncomeHead) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  IncomeHead is not allowed.' });
        }

        // Update the IncomeHead
        const result = await IncomeHead.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.searchIncomeHead = async (req, res) => {
    try {
        const data = req.params.incomeHead;
        const result = await IncomeHead.findOne({ data });
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

exports.deleteIncomeHead = async (req, res) => {
    try {
        const result = await IncomeHead.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}