const express = require('express');
const router = express.Router();
const usersCtrl = require ('../../controllers/users');
const passport = require('passport');

router.get('/', usersCtrl.getUsers);
router.get('/:id', checkAuth, usersCtrl.getUserById);
router.post('/signup', usersCtrl.createUser);
router.post('/login', usersCtrl.login);

function checkAuth(req, res, next) {
    if (req.user) return next();
        return res.status(401).json({msg: 'Not Authorized'});
    }

module.exports = router;