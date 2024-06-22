const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const { createHostel, hostelList, updateHostel, searchHostel, deleteHostel } = require("../controllers/hostel/hostel-controller");
const { createHostelRoom, hostelRoomList, updateHostelRoom, searchHostelRoom, deleteHostelRoom } = require("../controllers/hostel/hostelRoomController.js");
const { roomTypeCreate, roomTypeList, updateRoomType, deleteRoomType } = require("../controllers/hostel/roomTypes-controller");

//==========  Hostel  ==========

router.post('/createHostel', authMiddleware, createHostel);
router.get('/hostelList', authMiddleware, hostelList);
router.put('/updateHostel/:id', authMiddleware, updateHostel);
router.get('/searchHostel', authMiddleware, searchHostel)
router.delete('/deleteHostel/:id', authMiddleware, deleteHostel);

//========Room Types =================

router.post('/roomTypeCreate', authMiddleware, roomTypeCreate);
router.get('/roomTypeList', authMiddleware, roomTypeList);
router.put('/updateRoomType/:id', authMiddleware, updateRoomType);
router.delete('/deleteRoomType/:id', authMiddleware, deleteRoomType);

//==========Hostel Room==================
router.post('/createHostelRoom', authMiddleware, createHostelRoom);
router.get('/hostelRoomList', authMiddleware, hostelRoomList);
router.put('/updateHostelRoom/:id', authMiddleware, updateHostelRoom);
router.get('/searchHostelRoom', authMiddleware, searchHostelRoom)
router.delete('/deleteHostelRoom/:id', authMiddleware, deleteHostelRoom);

module.exports = router