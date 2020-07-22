const express = require('express');
const router = require('express').Router();
const expensesCtrl = require ('../../controllers/expenses');

// Has check auth, remember to put this back in after testing
// router.get('/:id', checkAuth, expensesCtrl.getUserExpenses);


// for testing only, remember to delete later !!!
router.get('/', expensesCtrl.getExpenses);
router.get('/:id', expensesCtrl.getUserExpenses);
router.post('/:id/expense', expensesCtrl.createExpense);



function checkAuth(req, res, next) {
    if (req.user) return next();
        return res.status(401).json({msg: 'Not Authorized'});
}


module.exports = router