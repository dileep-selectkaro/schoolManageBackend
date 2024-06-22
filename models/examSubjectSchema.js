const mongoose = require("mongoose")

const examSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject"
    },
    date: {
        type: Date,
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
   duration:{
    type:Number,
    required:true
   },
   roomNo:{
    type:Number,
    required:true
   },
   maxMarks:{
    types:Number,
    required:true
   },
   minMarks:{
    types:Number,
    required:true
   }
}, { timestamps: true });

module.exports = mongoose.model("exam", examSchema)