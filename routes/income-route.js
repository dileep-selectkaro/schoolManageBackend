const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const{createIncomeHead,incomeHeadList,updateIncomeHead,searchIncomeHead,deleteIncomeHead}=require("../controllers/income/incomeHead-controller.js")
const{createIncome,incomeList,updateIncome,searchIncome,deleteIncome}=require("../controllers/income/income-controller.js")

//==========income Head================
router.post('/createIncomeHead', authMiddleware, createIncomeHead);
router.get('/incomeHeadList', authMiddleware, incomeHeadList);
router.put('/updateIncomeHead/:id', authMiddleware, updateIncomeHead);
router.get('/searchIncomeHead',authMiddleware,searchIncomeHead)
router.delete('/deleteIncomeHead/:id', authMiddleware, deleteIncomeHead);

//============income===================
router.post('/createIncome',authMiddleware,createIncome);
router.get('/incomeList',authMiddleware,incomeList);
router.put('/updateIncome',authMiddleware,updateIncome);
router.get('/searchIncome',authMiddleware,searchIncome);
router.delete('/deleteIncome/:id',authMiddleware,deleteIncome);

module.exports=router;


