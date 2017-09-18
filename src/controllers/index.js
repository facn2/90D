const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateToken');

const signup = require('./signup');
const newUser = require('./newUser');
const login = require('./login');
const validate = require('./validateLogin');
const newGoal = require('./newGoal');
const addGoal = require('./addGoal');
const error = require('./error');
const goals = require('./goals');
const logout = require('./logout');
const updateGoal = require('./updateGoal');

router.get('/signup', signup);
router.post('/newUser', newUser);
router.get('/', login);
router.post('/validateLogin', validate);
router.get('/newGoal', validateToken, newGoal);
router.get('/goals', validateToken, goals);
router.get('/logout', logout);
router.post('/addGoal', addGoal);
router.post('/updateGoal', updateGoal);

router.use(error.client);
router.use(error.server);

module.exports = router;
