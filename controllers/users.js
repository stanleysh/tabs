const { pool } = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;

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
        console.log(results)
        res.status(200).json(results.rows)
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

async function login(req, res) {
    try {
        pool.query('SELECT * FROM users WHERE email = $1')
    }
}



function createJWT(user) {
    var id = user.id;
    return jwt.sign(
      {id},
      SECRET,
      {expiresIn: '24h'}
    );
  }

module.exports = {
    getUsers,
    getUserById,
    createUser,
    signIn
}