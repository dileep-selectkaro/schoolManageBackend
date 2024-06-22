const mongoose=require("mongoose");
const oldSessionSchema=new mongoose.Schema({
    session:{
        type:String,
        required:true,
    },
   sclass:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"sclass",
       required:true
   },
   section:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"section",
       required:true
   },
   subjectGroup:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"subjectGroup",
       required:true
   },
   subject:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"subject",
       required:true
   },
   school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
}
 
},{timestamps:true})

module.exports=mongoose.model("oldSession",oldSessionSchema);