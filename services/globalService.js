const { sendSuccessResponse, sendNotFoundResponse } = require("../utils/responseHandler");

const createDocument = async (Model, data) => {
    try {
        const result = await Model.create(data);
        return result;
    } catch (err) {
        throw err;
    }
};

const fetchDocuments = async (Model, query) => {
    try {
        const documents = await Model.find(query);
        return documents;
    } catch (err) {
        throw err;
    }
};

const getDocumentList = async (res, Model, query) => {
    const items = await fetchDocuments(Model, query);
    
    if (items.length > 0) {
        sendSuccessResponse(res, items);
    } else {
        sendNotFoundResponse(res);
    }
};

const updateDocumentById = async (Model, id, update) => {
    try {
        const result = await Model.findByIdAndUpdate(id, update, { new: true });
        return result;
    } catch (err) {
        throw err;
    }
};

const deleteDocumentById = async (Model, id) => {
    try {
        const result = await Model.findByIdAndDelete(id);
        return result;
    } catch (err) {
        throw err;
    }
};

const deleteDocumentsByQuery = async (Model, query) => {
    try {
        const result = await Model.deleteMany(query);
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createDocument,
    getDocumentList,
    updateDocumentById,
    deleteDocumentById,
    deleteDocumentsByQuery,
};