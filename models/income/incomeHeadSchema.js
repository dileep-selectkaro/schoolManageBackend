const mongoose=require("mongoose");
const incomeHeadSchema=new mongoose.Schema({
    incomeHead:{
     type:String,
     required:true

    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("incomeHead",incomeHeadSchema)