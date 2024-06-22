const mongoose=require("mongoose");
const attendenceLeaveSchema=new mongoose.Schema({
    sclass:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sclass",
        required:true
    },
    section:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"section",
        required:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student",
        required:true,

    },
    applyDate:{
        type:Date,
        required:true
    },
    fromDate:{
        type:Date,
        required:true
    },
    toDate:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
    },
    leaveStatus:{
        type:String,
        enum:["Pending","Disapprove","Approve"],
        required:true
    },
    attachDocument:{
        type:String
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
},{timestamps:true});

module.exports=mongoose.model("attendance",attendenceLeaveSchema)