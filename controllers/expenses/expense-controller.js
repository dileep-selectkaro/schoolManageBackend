const Expense = require('../../models/expenses/expenseSchema');
exports.createExpense = async (req, res) => {
    try {
        //  Expense already exists
        const existingExpense = await Expense.findOne({
            name: req.body.name,
            school: req.user.school
        });

        if (existingExpense) {
            return res.status(400).json({ message: "Duplicate  Expense is not allowed." });
        }

        // Create a new  Expense
        const expense = new Expense({
            ...req.body,
            school: req.user.school
        });

        const result = await expense.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};


exports.expenseList = async (req, res) => {
    try {
        let expense = await Expense.find({ school: req.user.school }).collation({ locale: "en" }).sort({ name: 1 })
        if (expense .length > 0) {
            res.send(Expense )
        } else {
            res.send({ message: "No Expense  found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const existingExpense = await Expense.findOne({
            _id: { $ne: id }, 
            data: new RegExp(`^${req.body}$`, 'i'), 
            school: req.user.school
        });

        if (existingExpense) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  Expense is not allowed.' });
        }

        // Update the Expense
        const result = await Expense.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.searchExpense = async (req, res) => {
    try {
        const data = req.params;
        const result = await Expense.findOne({ data });
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

exports.deleteExpense = async (req, res) => {
    try {
        const result = await Expense.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}