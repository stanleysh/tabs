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

const createUser = (req, res) => {
    bcrypt.hash(req.body.pw, SALT_ROUNDS)
    .then((hash) => {
        pool.query('INSERT INTO users (name, email, pw) VALUES ($1, $2, $3) RETURNING *', [req.body.name, req.body.email, hash], (error, newUser) => {
            if (error) {
                console.log(error)
            }
            res.json({token: createJWT(newUser)})
        })
    }) 
    .catch((err) => {
        return res.status(401).json(err)
    })
}

module.exports = {
    getExpenses,
    getUserExpenses
}

//