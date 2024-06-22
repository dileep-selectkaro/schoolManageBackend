const ItemStore = require('../../models/inventoryRelated/itemStoreSchema');
const { sendErrorResponse } = require('../../utils/responseHandler');

exports.createItemStore = async (req, res) => {
    try {
        //  ItemStore already exists
        const existingItemStore = await ItemStore.findOne({
            itemStoreName: req.body.itemStoreName,
            school: req.user.school
        });

        if (existingItemStore) {
            return res.send({ message: "Duplicate itemStore is not allowed." });
        }

        // Create a new  ItemStore
        const itemStore = new ItemStore({
            ...req.body,
            school: req.user.school
        });

        const result = await itemStore.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.itemStoreList = async (req, res) => {
    try {
        let itemStores = await ItemStore.find({ school: req.user.school })
            .collation({ locale: "en" })
            .sort({ itemStoreName: -1 })

        if (itemStores.length > 0) {
            res.send(itemStores)
        } else {
            res.send({ message: "No itemStores found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.updateItemStore = async (req, res) => {
    try {
        const { id } = req.params;

        const existingItemStore = await ItemStore.findOne({
            _id: { $ne: id },
            data: new RegExp(`^${req.body}$`, 'i'),
            school: req.user.school
        });

        if (existingItemStore) {
            return res.status(400).json({ message: 'Updating to a case-insensitive duplicate  ItemStore is not allowed.' });
        }

        // Update the ItemStore
        const result = await ItemStore.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.searchItemStore = async (req, res) => {
    try {
        const data = req.params.ItemStore;
        const result = await ItemStore.findOne({ data });
        if (result) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'Data not found' });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteItemStore = async (req, res) => {
    try {
        const result = await ItemStore.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        sendErrorResponse(res, err);
    }
}