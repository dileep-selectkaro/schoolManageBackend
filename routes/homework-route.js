const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { createHomework, homeworkList, updateHomework, searchHomework, deleteHomework, dailyAssignmentList } = require("../controllers/homework/homework-controller.js")

router.post('/createHomework', authMiddleware, upload.single('attachDocument'), createHomework);
router.get('/homeworkList/:sclassName/:section/:subjectGroup/:subject', authMiddleware, homeworkList);
router.get('/dailyAssignmentList/:sclassName/:section/:subjectGroup/:subject/:date', authMiddleware, dailyAssignmentList);
router.put('/updateHomework/:id', authMiddleware, updateHomework);
router.get('/searchHomework', authMiddleware, searchHomework)
router.delete('/deleteHomework/:id', authMiddleware, deleteHomework);

module.exports = router;