const mongoose=require("mongoose");
const expenseHeadSchema=new mongoose.Schema({
    expenseHead:{
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
},{timestamps:true});

module.exports=mongoose.model("expenseHead",expenseHeadSchema)