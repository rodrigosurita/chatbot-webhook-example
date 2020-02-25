const express = require('express');

const router = express.Router();
const rateLimit = require('express-rate-limit');
const loginController = require('../controllers/AuthController');

// login page
router.get('/', loginController.login);
// login page
router.get('/login', loginController.login);

// login rate limiter
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5, // start blocking after 5 requests
  message: {
    status: 0,
    msg: 'Login ou senha incorretos!2222222',
  },
});

// submit login
router.post('/login/submit', loginLimiter, loginController.loginSubmit);

/* LOGOUT */
router.post('/logout', loginController.logout);

// Register page
router.get('/register', loginController.register);
router.post('/register/submit', loginController.registerSubmit);

module.exports = router;
