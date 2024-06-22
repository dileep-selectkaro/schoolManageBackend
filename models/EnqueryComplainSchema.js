const mongoose=require("mongoose");
const enquryComplainSchema=new mongoose.Schema({
  type:{
    type:String,
    required:true
  },
  source:{
    type:String,
    required: true
  }
  ,
  complainBy:{
    type:String,
    required:true
  }
  ,
  phone:{
    type:Number,
    required:true
  }
  ,
  description:{
    type:String,
    required:true
  }
  ,
  date:{
    type:Date,
    required:true
  }
  ,
  actionTaken:{
    type:String,
    required:true
  }
  ,
  assigned:{
    type:String,
    required:true
  },
  note:{
    type:String,
    required:true
  },
  attachDocument:{
    type:String
  },
   school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
}
},{timestamps:true})

const EnquryComplain=mongoose.model("enquryComplain",enquryComplainSchema);
module.exports=EnquryComplain;