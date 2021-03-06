// Updating expenses using total amount from expense table
// WITH total as (SELECT user_id, SUM(amount) as total_expense FROM expenses GROUP BY user_id)
// UPDATE users SET current_funds = total.total_expense FROM total WHERE users.id = total.user_id

const { pool } = require('../config/database');

const getExpenses = (req, res) => {
  pool.query('SELECT * FROM expenses', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// pool.query('SELECT categories.category_name, expenses.name, expenses.amount FROM expenses, categories WHERE expenses.user_id = $1 AND  categories.user_id = $1', [id], (error, results) => {

const getUserExpenses = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT category_name, name, amount, expense_date::date FROM expenses INNER JOIN categories ON categories.id = expenses.category_id WHERE expenses.user_id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const createExpense = (req, res) => {
  const user_id = parseInt(req.params.id);
  pool.query('INSERT INTO expenses (user_id, categories_id, name, amount, expense_date) VALUES ($1, $2, $3, $4, $5)', [user_id, req.body.category_id, req.body.name, req.body.amount, req.body.expense_date], (error, newExpense) => {
    if (error) {
      console.log(error);
    } else {
      res.json({ msg: 'Expense created' });
    }
  });
};

const getMonthlyAndTotal = (req, res) => {
  if (req.params.id) {
    const user_id = parseInt(req.params.id);
  } else {
    const user_id = 1;
  }
  pool.query('SELECT(SELECT SUM(amount) FROM expenses WHERE user_id = $1) AS total_amount, (SELECT SUM(amount) FROM expenses WHERE user_id = $1 AND date_trunc(\'month\', expense_date) = date_trunc(\'month\', CURRENT_DATE) AND date_trunc(\'year\', expense_date) = date_trunc(\'year\', CURRENT_DATE)) AS current_amount', [user_id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.json(result.rows[0]);
  });
};

const getDemoMonth = (req, res) => {
  // pool.query('SELECT(SELECT SUM(amount) FROM expenses WHERE user_id = 1) AS total_amount, (SELECT SUM(amount) FROM expenses WHERE user_id = 1 AND expense_date >= date_trunc(\'month\', CURRENT_DATE)) AS current_amount', (error, result) =>{
  pool.query('SELECT(SELECT SUM(amount) FROM expenses WHERE user_id = 1) AS total_amount, (SELECT SUM(amount) FROM expenses WHERE user_id = 1 AND EXTRACT(MONTH FROM expense_date) = 7) AS current_amount', (error, result) => {
    if (error) {
      console.log(error);
    }
    res.status(200).json(result.rows[0]);
  });
};

module.exports = {
  getExpenses,
  getUserExpenses,
  createExpense,
  getMonthlyAndTotal,
  getDemoMonth,
};
