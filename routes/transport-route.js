const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const{createVehicle,vehicleList,updateVehicle,searchVehicle,deleteVehicle}=require("../controllers/transport/vehicle-controller.js")
const {createPickupPoint,pickupPointList,updatePickupPoint,searchPickupPoint,deletePickupPoint }=require("../controllers/transport/pickupPoint-controller.js")
const {createRoute,routeList,updateRoute,searchRoute,deleteRoute}=require("../controllers/transport/routes-controller.js")
//==========Vehicle================
router.post('/createVehicle', authMiddleware, createVehicle);
router.get('/vehicleList', authMiddleware, vehicleList);
router.put('/updateVehicle/:id', authMiddleware, updateVehicle);
router.get('/searchVehicle',authMiddleware,searchVehicle)
router.delete('/deleteVehicle /:id', authMiddleware, deleteVehicle );

// ========routes=============
router.post('/createRoute', authMiddleware,createRoute);
router.get('/routeList', authMiddleware, routeList);
router.put('/updateRoute/:id', authMiddleware, updateRoute);
router.get('/searchRoute',authMiddleware,searchRoute)
router.delete('/deleteRoute /:id', authMiddleware, deleteRoute);
//=========pickupPoint==========

router.post('/createPickupPoint', authMiddleware,createPickupPoint);
router.get('/pickupPointList', authMiddleware, pickupPointList);
router.put('/updatePickupPoint/:id', authMiddleware, updatePickupPoint);
router.get('/searchPickupPoint',authMiddleware,searchPickupPoint)
router.delete('/deletePickupPoint /:id', authMiddleware, deletePickupPoint  );

module.exports=router