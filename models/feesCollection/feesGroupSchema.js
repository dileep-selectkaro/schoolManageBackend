const mongoose=require("mongoose");

const feesGroupSchema=new mongoose.Schema({
 name:{
    type:String,
    required:[true,"name is required"],

 },
 description:{
    type:String,
    
 },
 school: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'admin'
},
},{timestamps:true})

module.exports=mongoose.model("feesGroup",feesGroupSchema);
