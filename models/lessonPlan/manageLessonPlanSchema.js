const mongoose=require("mongoose");
const manageLessonPlanSchema=new mongoose.Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher",
        required:true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    }
},{timestamps:true})

module.exports=mongoose.model("manageLessonPlan",manageLessonPlanSchema);