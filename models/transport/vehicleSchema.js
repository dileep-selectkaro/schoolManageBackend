const mongoose=require("mongoose");

const vehicleSchema=new mongoose.Schema({
    vehicleNumber:{
        type:String,
        required:true,
        trim:true
    },
    vehicleModel:{
        type:String,
        trim:true
    },
    yearMade:{
        type:String,
        trim:true,

    },
    registrationNumber:{
        type:String,
        trim:true

    },
    chasisNumber:{
        type:String,
        trim:true
    },
    maxSeatingCapacity:{
        type:Number,
        trim:true
    },
    driverName:{
        type:String,
        trim:true
    },
    driverLicence:{
        type:String,
        trim:true
    },
    driverContact:{
        type:String,
        trim:true
    },
    vehiclePhoto:{
        type:String,

    },
    note:{
        type:String,

    }
},{timestamps:true})

module.exports=mongoose.model("vehicle",vehicleSchema)