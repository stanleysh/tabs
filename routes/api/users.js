const express = require('express');
const router = express.Router();
const usersCtrl = require ('../../controllers/users');
const passport = require('passport');

router.get('/', usersCtrl.getUsers);
router.get('/:id', usersCtrl.getUserById);
router.post('/signup', usersCtrl.createUser);
router.post('/login', usersCtrl.login);

const requireSignIn = passport.authenticate('local', {session: false})


module.exports = router;