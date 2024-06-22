const mongoose=require("mongoose");

const assignVehicleSchema=new mongoose.Schema({
    route:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"route"
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vehicle"
    },
    school:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    }
},{timestamps:true})

module.exports=mongoose.model("assignVehicle",assignVehicleSchema);
