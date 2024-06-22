const mongoose=require("mongoose");
const setupFrontOfficeSchema=new mongoose.Schema({
  purpose:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required: true
  },
   school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
}
},{timestamps:true})

const SetupFrontOffice=mongoose.model("setupFrontOffice",setupFrontOfficeSchema);
module.exports=SetupFrontOffice;