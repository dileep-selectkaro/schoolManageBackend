const mongoose=require("mongoose");
const routeSchema=new mongoose.Schema({
    routeTitle:{
        type:String,
        required:true,
        trim:true
    },
    school:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    }
},{timestamps:true})

module.exports=mongoose.model("route",routeSchema); 