const express = require('express');
const router = require('express').Router();
const usersCtrl = require('../../controllers/users');

router.post('/signup', usersCtrl.createUser);
router.post('/login', usersCtrl.login);

// For testing, delete later or add auth
router.get('/', usersCtrl.getUsers);
router.get('/:id', usersCtrl.getUserById);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
