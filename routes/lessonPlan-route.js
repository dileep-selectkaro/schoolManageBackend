const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const{createLesson,lessonList,updateLesson,searchLesson,deleteLesson}=require("../controllers/lessonPlan/lesson-controller");
const{createTopic,topicList,updateTopic,searchTopic,deleteTopic}=require("../controllers/lessonPlan/topic-controller.js")

//==========Lesson ================
router.post('/createLesson', authMiddleware, createLesson);
router.get('/lessonList', authMiddleware, lessonList);
router.put('/updateLesson/:id', authMiddleware, updateLesson);
router.get('/searchLesson',authMiddleware,searchLesson)
router.delete('/deleteLesson/:id', authMiddleware, deleteLesson);

//===========Topic=================
router.post('/createTopic', authMiddleware, createTopic);
router.get('/topicList', authMiddleware, topicList);
router.put('/updateTopic/:id', authMiddleware, updateTopic);
router.get('/searchTopic',authMiddleware,searchTopic)
router.delete('/deleteTopic/:id', authMiddleware, deleteTopic);

module.exports=router;
