const mongoose=require("mongoose");
const expenseSchema=new mongoose.Schema({
    expenseHead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"expenseHead",
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
        required:true
    },
    description:{
        type:String,
        required:true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
},{timestamps:true})

module.exports=mongoose.model("expense",expenseSchema)
