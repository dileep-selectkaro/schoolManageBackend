const mongoose=require("mongoose");

const feesDiscountSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name filed is required"],
    },
    discountCode:{
        type:String,
        required:[true,"discount code  filed is required"],

    },
    discountType:{
        type:String,
        enum:["Percentage","Fix Amount"],
        
    },
    Percentage:{
        type:String,
        required:[true,"Percentage filed is required"],

    },
    amount:{
        type:String,
        required:[true,"amount filed is required"],

    },
    description:{
        type:String
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
},{timestamps:true})

module.exports=mongoose.model("feesDiscount",feesDiscountSchema)