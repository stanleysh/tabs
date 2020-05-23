const { pool } = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12 

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(400).json(error)
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    bcrypt.hash(req.body.pw, SALT_ROUNDS, function (err, hash) {
        if (err) return next(err);
        pool.query('INSERT INTO users (name, email, pw) VALUES ($1, $2, $3) RETURNING *', [req.body.name, req.body.email, hash], (error, results) => {
            if (error) {
                res.status(400).json(error)
            }
            res.status(200).json(results.rows)
        })
    })
}

const signIn = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) })
}

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.enconde({sub: user.id, iat: timestamp}, config.secret)
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    signIn
}