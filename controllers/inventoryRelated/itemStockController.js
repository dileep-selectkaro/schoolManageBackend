const ItemStock = require('../../models/inventoryRelated/itemStockSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createItemStock = async (req, res) => {
    try {
        const itemStock = new ItemStock({
            ...req.body,
            school: req.user.school
        });

        const result = await itemStock.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.itemStockList = async (req, res) => {
    try {
        let itemStocks = await ItemStock.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ itemCategory: -1 })
            .populate("itemCategory", "itemCategoryName")
            .populate("item", "itemName")
            .populate("itemSupplier", "supplierPerson")
            .populate("itemStore", "itemStoreName")

        if (itemStocks.length > 0) {
            res.send(itemStocks)
        } else {
            res.send({ message: "No itemStocks found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateItemStock = async (req, res) => {
    try {
        const { id } = req.params;

        const existingItemStock = await ItemStock.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingItemStock) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  ItemStock is not allowed.' });
        }

        // Update the ItemStock
        const result = await ItemStock.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};


exports.searchItemStock = async (req, res) => {
    try {
        const data = req.params.itemStock;
        const result = await ItemStock.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteItemStock = async (req, res) => {
    try {
        const result = await ItemStock.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}