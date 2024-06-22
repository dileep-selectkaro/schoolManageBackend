const mongoose= require("mongoose");
const studentCategorySchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    school:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin"
    }
},{timestamps:true})

const StudentCategory=mongoose.model("studentCategory",studentCategorySchema);
module.exports=StudentCategory