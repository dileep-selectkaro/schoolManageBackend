const mongoose=require("mongoose");
const librarySchema=new mongoose.Schema({
  bookTitle:{
    type:String,
    required:true
  },
  bookNumber:{
    type:String,
    required: true
  }
  ,
  publisher:{
    type:String,
    required:true
  }
  ,
  subject:{
    type:String,
    required:true
  }
  ,
  quantity:{
    type:String,
    required:true
  }
  ,
  isbnNumber:{
    type:String,
    required:true
  },
   author:{
    type:String,
    required:true
  },
   rackNumber:{
    type:String,
    required:true
  },
   bookPrice:{
    type:String,
    required:true
  },
   postDate:{
    type:Date,
    required:true
  },
   description:{
    type:String,
    required:true
   
},
school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin'
}
},{timestamps:true})

const Library=mongoose.model("library",librarySchema);
module.exports=Library;