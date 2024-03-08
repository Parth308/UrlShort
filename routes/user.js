const express = require('express');
const { handleUserSignUp, handleUserLogin } = require('../controllers/user');

const router = express.Router();

// "/" -> "/user"
router.post('/', handleUserSignUp);
router.post('/login', handleUserLogin);

module.exports = router;
