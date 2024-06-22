const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const{createExpenseHead,expenseHeadList,updateExpenseHead,searchExpenseHead,deleteExpenseHead }=require("../controllers/expenses/expenseHead-controller.js")
const{createExpense,expenseList,updateExpense,searchExpense,deleteExpense}=require("../controllers/expenses/expense-controller.js")

//==========expense Head================
router.post('/createExpenseHead', authMiddleware, createExpenseHead);
router.get('/expenseHeadList', authMiddleware, expenseHeadList);
router.put('/updateExpenseHead/:id', authMiddleware, updateExpenseHead);
router.get('/searchExpenseHead',authMiddleware,searchExpenseHead)
router.delete('/deleteExpenseHead /:id', authMiddleware, deleteExpenseHead );

//============expense===================
router.post('/createExpense',authMiddleware,createExpense);
router.get('/expenseList',authMiddleware,expenseList);
router.put('/updateExpense',authMiddleware,updateExpense);
router.get('/searchExpense',authMiddleware,searchExpense);
router.delete('/deleteExpense/:id',authMiddleware,deleteExpense);

module.exports=router;


