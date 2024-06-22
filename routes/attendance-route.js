const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const{createApproveLeave,approveLeaveList,updateApproveLeave,searchApproveLeave,deleteApproveLeave}=require("../controllers/attendance/approveLeave.js")

//==========expense Head================
router.post('/createApproveLeave', authMiddleware, createApproveLeave);
router.get('/approveLeaveList', authMiddleware, approveLeaveList);
router.put('/updateApproveLeave/:id', authMiddleware, updateApproveLeave);
router.get('/searchApproveLeave',authMiddleware,searchApproveLeave)
router.delete('/deleteApproveLeave /:id', authMiddleware, deleteApproveLeave );