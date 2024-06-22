const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  createFeesDiscount,
  feesDiscountList,
  updateFeesDiscount,
  searchFeesDiscount,
  deleteFeesDiscount,
} = require("../controllers/feesCollection/feesDiscount-controller.js");
const {
  createFeesGroup,
  feesGroupList,
  updateFeesGroup,
  searchFeesGroup,
  deleteFeesGroup,
} = require("../controllers/feesCollection/feesGroup-controller.js");
const {
  createFeesMaster,
  feesMasterList,
  updateFeesMaster,
  searchFeesMaster,
  deleteFeesMaster,
} = require("../controllers/feesCollection/feesMaster-controller.js");

const {createFeesType ,feesTypeList,updateFeesType,searchFeesType,deleteFeesType}=require("../controllers/feesCollection/feesType-controller.js")
//==========fees Discount================
router.post("/createFeesDiscount", authMiddleware, createFeesDiscount);
router.get("/feesDiscountList", authMiddleware, feesDiscountList);
router.put("/updateFeesDiscount/:id", authMiddleware, updateFeesDiscount);
router.get("/searchFeesDiscount", authMiddleware, searchFeesDiscount);
router.delete("/deleteFeesDiscount /:id", authMiddleware, deleteFeesDiscount);

//===============fess Group=================
router.post("/createFeesGroup", authMiddleware, createFeesGroup);
router.get("/feesGroupList", authMiddleware, feesGroupList);
router.put("/updateFeesGroup/:id", authMiddleware, updateFeesGroup);
router.get("/searchFeesGroup", authMiddleware, searchFeesGroup);
router.delete("/deleteFeesGroup/:id", authMiddleware, deleteFeesGroup);

//=========Fees Master=================
router.post("/createFeesMaster", authMiddleware, createFeesMaster);
router.get("/feesMasterList", authMiddleware, feesMasterList);
router.put("/updateFeesMaster/:id", authMiddleware, updateFeesMaster);
router.get("/searchFeesMaster", authMiddleware, searchFeesMaster);
router.delete("/deleteFeesMaster", authMiddleware, deleteFeesMaster);

//=========== Fees Type=================
router.post("/createFeesType",authMiddleware,createFeesType);
router.get("/feesTypeList",authMiddleware,feesTypeList);
router.put("/updateFeesType/:id",authMiddleware,updateFeesType);
router.get("/searchFeesType",authMiddleware,searchFeesType);
router.delete("/deleteFeesType",authMiddleware,deleteFeesType);

module.exports = router;
