const Library = require('../models/librarySchema');

exports.bookCreate = async (req, res) => {
    try {
        const book = new Library({
            ...req.body,
            school: req.user.school
        });
        

        const result = await book.save();

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.bookList = async (req, res) => {
    try {
        let book = await Library.find({ school: req.user.school }).collation({ locale: "en" }).sort({ bookTitle: 1 });


        if (book.length > 0) {
            res.send(book)
        } else {
            res.send({ message: "No book found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.bookUpdate = async (req, res) => {
    try {
        let result = await Library.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const result = await Library.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}