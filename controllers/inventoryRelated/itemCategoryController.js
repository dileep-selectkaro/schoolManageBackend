const ItemCategory = require("../../models/inventoryRelated/itemCategorySchema");
const { sendErrorResponse } = require("../../utils/responseHandler");

//==========create ItemCategory =============
exports.itemCategoryCreate = async (req, res) => {
    try {
        const itemCategories = req.body.itemCategories;
        const schoolId = req.user.school;
        const newItemCategories = itemCategories.map(itemCategory => ({
            ...itemCategory,
            school: schoolId
        }));

        // check duplicate itemCategoryName in the provided input, ignoring case
        const itemCategoryNames = newItemCategories.map(itemCategory => new RegExp(`^${itemCategory.itemCategoryName}$`, 'i'));

        const existingItemCategories = await ItemCategory.find({
            school: schoolId,
            itemCategoryName: { $in: itemCategoryNames }
        });

        if (existingItemCategories.length > 0) {
            // ItemCategory names are duplicates
            const existingItemCategoryNames = existingItemCategories.map(sec => sec.itemCategoryName);
            return res.status(400).json({
                message: "Duplicate itemCategory names are not allowed.",
                duplicates: existingItemCategoryNames
            });
        }

        // Insert if there are no duplicates
        const result = await ItemCategory.insertMany(newItemCategories);
        res.send(result);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.itemCategoryList = async (req, res) => {
    try {
        let itemCategories = await ItemCategory.find({
            school: req.user.school,
        }).collation({ locale: "en" }).sort({ itemCategoryName: 1 });
       
        if (itemCategories.length > 0) {
            res.send(itemCategories)
        } else {
            res.send({ message: "No itemCategories found" });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

//=================== update ItemCategoryName=================
exports.updateItemCategory = async (req, res) => {
    try {
        const { itemCategoryName } = req.body;
        const schoolId = req.user.school;

        // Check if the provided itemCategoryName already exists in same school
        const existingItemCategory = await ItemCategory.findOne({
            school: schoolId,
            itemCategoryName: itemCategoryName,
            itemCategoryName: new RegExp(`^${itemCategoryName}$`, 'i'), // Case-insensitive match
            _id: { $ne: req.params.id } 
        });

        if (existingItemCategory) {
            return res.status(400).json({
                message: "Already exists ItemCategoryName in the same school."
            });
        }

        const updatedItemCategory = await ItemCategory.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.send(updatedItemCategory);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

exports.deleteItemCategory = async (req, res) => {
    try {
        const deletedItemCategory = await ItemCategory.findByIdAndDelete(req.params.id);

        if (deletedItemCategory) {
            res.send({ success: "ItemCategory deleted successfully." });
        } else {
            res.status(404).json({ message: "ItemCategory not found." });
        }
    } catch (err) {
        sendErrorResponse(res, err);
    }
};