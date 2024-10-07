const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:email', getUser);

module.exports = router;
