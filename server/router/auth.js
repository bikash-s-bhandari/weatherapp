const express = require('express');
const router = express.Router();
const {
     registerUser,
     loginUser,
     activateEmail,
     getRefreshToken,
     getCurrentUser,
     logout,

} = require('../controllers/auth');
const { authMiddleware } = require('../middleware/auth')
const { registerValidation, loginValidation } = require('../middleware/validator')

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/user/verify', activateEmail);

router.get('/get-refresh-token', getRefreshToken)
router.route('/logout').get(logout);

router.get('/me', authMiddleware, getCurrentUser);




module.exports = router;