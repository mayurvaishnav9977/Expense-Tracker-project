const { fetchExpenses, addExpenses, deleteExpenses } = require('../controllers/ExpenseController');

const router = require('express').Router();

//fetch expenses on user id
router.get('/',fetchExpenses)
//add expense
router.post('/',addExpenses)
//delete expense
router.delete('/:expenseId',deleteExpenses)

module.exports = router;