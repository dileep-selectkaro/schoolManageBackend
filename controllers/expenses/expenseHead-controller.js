const ExpenseHead = require('../../models/expenses/expenseHeadSchema');

//===========create============
exports.createExpenseHead = async (req, res) => {
    try {
        // Check if ExpenseHead already exists
        const existingExpenseHead = await ExpenseHead.findOne({
            expenseHead: req.body.expenseHead,
            school: req.user.school
        });

        if (existingExpenseHead) {
            return res.status(400).json({ message: "Duplicate ExpenseHead is not allowed." });
        }

        // Create a new ExpenseHead
        const expenseHead = new ExpenseHead({
            ...req.body,
            school: req.user.school
        });

        const result = await expenseHead.save();

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.expenseHeadList = async (req, res) => {
    try {
        let expenseHead = await ExpenseHead.find({ school: req.user.school }).collation({ locale: "en" }).sort({ expenseHead: 1 })
        if (expenseHead .length > 0) {
            res.send(ExpenseHead )
        } else {
            res.send({ message: "No ExpenseHead  found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    } 
};

exports.updateExpenseHead = async (req, res) => {
    try {
        const { id } = req.params;

        const existingExpenseHead = await ExpenseHead.findOne({
            _id: { $ne: id }, 
            expenseHead: new RegExp(`^${req.body.expenseHead}$`, 'i'), 
            school: req.user.school
        });

        if (existingExpenseHead) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  ExpenseHead is not allowed.' });
        }

        // Update the ExpenseHead
        const result = await ExpenseHead.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.searchExpenseHead = async (req, res) => {
    try {
        const data = req.params.ExpenseHead;
        const result = await ExpenseHead.findOne({ data });
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

exports.deleteExpenseHead = async (req, res) => {
    try {
        const result = await ExpenseHead.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}