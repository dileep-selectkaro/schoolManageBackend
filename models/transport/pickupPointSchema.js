const mongoose=require("mongoose");
const pickupPointSchema=new mongoose.Schema({
    pickupPoint:{
        type:String,
        required:true,
        trim:true,
    },
   latitude:{
    type:String,
    required:true,
    trim:true
   },
   longitude:{
    type:String,
    required:true,
    trim:true
   },
   school:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"admin"
   }

},{timestamps:true})

module.exports=mongoose.model("pickupPoint",pickupPointSchema)