const mongoose=require("mongoose");
const incomeSchema=new mongoose.Schema({
    incomeHead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"incomeHead",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    invoiceNumber:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    attachDocument:{
        type:String,
        
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("income",incomeSchema)