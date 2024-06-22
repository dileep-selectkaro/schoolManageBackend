const mongoose=require("mongoose");
const manageSyllabusStatusSchema=new mongoose.Schema({
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
   LessonTopic:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"topic"
   },
   topicCompletionDate:{
    type:Date,
   },
   status:{
    type:String,
    enum:["Completed","Incomplete"]
   },
   school: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'admin',
       required: true,
   }
},{timestamps:true})

module.exports=mongoose.model("manageSyllabusStatus", manageSyllabusStatusSchema);