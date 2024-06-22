const mongoose=require("mongoose");
const feesMasterSchema=new mongoose.Schema({
    feesGroup:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"feesGroup",
        required:[true,"fees group field  is required"],
    },
    feesType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"feesType",
        required:[true,"fees Type  field is required"],
    },
    dueDate:{
        type:Date
    },
    amount:{
        type:String,
        required:[true,"amount is field required "]
    },
    fineType:{
        type:String,
        enum:["None","Percentage","Fix Amount"]
    },
    percentage:{
        type:String,
        required:[true,"percentage filed is required"]
    },
    fixAmount:{
        type:String,
        required:[true,"fix amount field is required"]
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
},{timestamps:true})

module.exports=mongoose.model("feesMaster",feesMasterSchema);