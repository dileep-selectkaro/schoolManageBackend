const mongoose = require("mongoose");

const issueItemSchema = new mongoose.Schema({
    issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'issuedToType'
    },
    issuedToType: {
        type: String,
        required: true
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'issuedByType'
    },
    issuedByType: {
        type: String,
        required: true
    },
    issuedDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    itemCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itemCategory'
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    },
    quantity: {
        type: String,
        required: true
    },
    itemStatus: {
        type: String,
        default: "Issued"
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { timestamps: true })

const IssueItem = mongoose.model("issueItem", issueItemSchema);

module.exports = IssueItem;