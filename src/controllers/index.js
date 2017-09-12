const express = require('express');
const router = express.Router();

const signup = require('./signup');

router.get('/signup', signup);

module.exports = router;
