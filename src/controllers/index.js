const express = require('express');
const router = express.Router();

const signup = require('./signup');
const newUser = require('./newUser');
const login = require('./login');
const validate = require('./validateLogin');
const newGoal = require('./newGoal');
const error = require('./error');
const goals = require('./goals');
const logout = require('./logout');

router.get('/signup', signup);
router.post('/newUser', newUser);
router.get('/', login);
router.post('/validateLogin', validate);
router.get('/newGoal', newGoal);
router.get('/goals', goals);
router.get('logout', logout);

router.use(error.client);
router.use(error.server);

module.exports = router;
