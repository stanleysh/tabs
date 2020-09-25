const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../config/database');

const { SECRET } = process.env;

const SALT_ROUNDS = 12;

const getUsers = (req, res) => {
  pool.query('SELECT id, name, email, current_funds FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT id, name, email FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.pw, SALT_ROUNDS)
    .then((hash) => {
      pool.query('INSERT INTO users (name, email, pw) VALUES ($1, $2, $3) RETURNING *', [req.body.name, req.body.email, hash], (error, newUser) => {
        if (error) {
          console.log(error);
        }
        res.json({ token: createJWT(newUser) });
      });
    })
    .catch((err) => res.status(401).json(err));
};

async function login(req, res) {
  try {
    pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], (error, user) => {
      comparePassword(user, req.body.pw, (err, isMatch) => {
        if (isMatch) {
          const token = createJWT(user);
          res.json({ token });
        } else {
          return res.status(401).json({ err: 'Bad credentials' });
        }
      });
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

// Login and authentication functions for controllers
function createJWT(user) {
  return jwt.sign(
    { user },
    SECRET,
    { expiresIn: '24h' },
  );
}

function comparePassword(user, tryPassword, cb) {
  bcrypt.compare(tryPassword, user.rows[0].pw, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
};
