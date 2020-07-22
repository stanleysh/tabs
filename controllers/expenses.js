// Updating expenses using total amount from expense table
// WITH total as (SELECT user_id, SUM(amount) as total_expense FROM expenses GROUP BY user_id) UPDATE users SET current_funds = total.total_expense FROM total WHERE users.id = total.user_id

const { pool } = require('../config/database');

const getExpenses = (req, res) => {
    pool.query('SELECT * FROM expenses', (error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getUserExpenses = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT categories.category_name, expenses.name, expenses.amount FROM expenses, categories WHERE expenses.user_id = $1 AND  categories.user_id = $1', [id], (error, results) => {
        if (error) {
            res.status(400).json(error)
        } else {
            res.status(200).json(results.rows)
        }
    })
}

const createExpense = (req, res) => {
    const user_id = parseInt(req.params.id)
    pool.query('INSERT INTO expenses (user_id, categories_id, name, amount, expense_date) VALUES ($1, $2, $3, $4, $5)', [user_id, req.body.category_id, req.body.name, req.body.amount, req.body.expense_date], (error, newExpense) => {
        if (error) {
            console.log(error)
        } else {
            res.json({msg: 'Question created'});
        }
    })
}

module.exports = {
    getExpenses,
    getUserExpenses,
    createExpense
}

