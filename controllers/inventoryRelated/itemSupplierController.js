const ItemSupplier = require('../../models/inventoryRelated/itemSupplierSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createItemSupplier = async (req, res) => {
    try {
        const itemSupplier = new ItemSupplier({
            ...req.body,
            school: req.user.school
        });

        const result = await itemSupplier.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.itemSupplierList = async (req, res) => {
    try {
        let itemSuppliers = await ItemSupplier.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ name: -1 })

        if (itemSuppliers.length > 0) {
            res.send(itemSuppliers)
        } else {
            res.send({ message: "No itemSupplier  found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateItemSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const existingItemSupplier = await ItemSupplier.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingItemSupplier) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  ItemSupplier is not allowed.' });
        }

        // Update the ItemSupplier
        const result = await ItemSupplier.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchItemSupplier = async (req, res) => {
    try {
        const data = req.params.itemSupplier;
        const result = await ItemSupplier.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (error) {
        sendErrorResponse(res, err);
    }
}

exports.deleteItemSupplier = async (req, res) => {
    try {
        const result = await ItemSupplier.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}