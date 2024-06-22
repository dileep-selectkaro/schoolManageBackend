const Item = require('../../models/inventoryRelated/itemSchema.js');
const { sendErrorResponse } = require('../../utils/responseHandler.js');

exports.itemCreate = async (req, res) => {
    try {
        const item = new Item({
            ...req.body,
            school: req.user.school
        });

        const result = await item.save();

        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.itemList = async (req, res) => {
    try {
        let items = await Item.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ itemName: 1 })
            .populate("itemCategory", "itemCategoryName")

        if (items.length > 0) {
            res.send(items)
        } else {
            res.send({ message: "No items found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.specificItemCategoryItemList = async (req, res) => {
    try {
        let items = await Item.find({
            school: req.user.school,
            itemCategory: req.params.itemCategory,
        }).collation({ locale: "en" }).sort({ itemName: 1 })
            .populate("itemCategory", "itemCategoryName")

        if (items.length > 0) {
            res.send(items)
        } else {
            res.send({ message: "No items found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.itemUpdate = async (req, res) => {
    try {
        let result = await Item.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        res.send(result)

    } catch (err) {
        sendErrorResponse(res, err);
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (deletedItem) {
            res.send({ success: "Item deleted successfully." });
        } else {
            res.status(404).json({ message: "Item not found." });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};