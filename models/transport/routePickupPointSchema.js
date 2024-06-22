const mongoose=require("mongoose");
const routePickupPointSchema=new mongoose.Schema({
    route:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"route",
        required:true
    },
    pickupPoint:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"pickupPoint"
    },
    distance:{
        type:Number,
        trim:true
    },
    pickupTime:{
        type:String,
        required:true
    },
    monthlyFees:{
        type:Number,
        required:true
    },
    school:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    }
})

module.exports=mongoose.model("routePickupPoint",routePickupPointSchema)