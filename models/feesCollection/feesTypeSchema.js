const mongoose=require("mongoose");
const feesTypeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],

    },
    feesCode:{
        type:String,
        required:[true,"feesCode is required"],

    },
    description:{
        type:String
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
},{timestamps:true})

module.exports=mongoose.model("feesType",feesTypeSchema);