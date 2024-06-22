const Income = require('../../models/income/incomeSchema');
exports.createIncome = async (req, res) => {
    try {
        //  Income already exists
        const existingIncome = await Income.findOne({
            name: req.body.name,
            school: req.user.school
        });

        if (existingIncome) {
            return res.status(400).json({ message: "Duplicate  Income is not allowed." });
        }

        // Create a new  Income
        const income = new Income({
            ...req.body,
            school: req.user.school
        });

        const result = await income.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.incomeList = async (req, res) => {
    try {
        let income = await Income.find({ school: req.user.school }).collation({ locale: "en" }).sort({ name: 1 })
        if (income .length > 0) {
            res.send(income )
        } else {
            res.send({ message: "No Income  found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const existingIncome = await Income.findOne({
            _id: { $ne: id }, 
            data: new RegExp(`^${req.body}$`, 'i'), 
            school: req.user.school
        });

        if (existingIncome) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  Income is not allowed.' });
        }

        // Update the Income
        const result = await Income.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.searchIncome = async (req, res) => {
    try {
        const data = req.params;
        const result = await Income.findOne({ data });
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

exports.deleteIncome = async (req, res) => {
    try {
        const result = await Income.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}