const express = require('express');
const router = express.Router();

const signup = require('./signup');
const newUser = require('./newUser');
const login = require('./login');
const error = require('./error');

router.get('/signup', signup);
router.post('/newUser', newUser);
router.get('/login', login);

router.use(error.client);
router.use(error.server);

module.exports = router;
