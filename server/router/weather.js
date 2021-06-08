const express = require('express');
const router = express.Router();
const {
     getWeatherData

} = require('../controllers/weather');
const { authMiddleware } = require('../middleware/auth')
router.get('/get', authMiddleware, getWeatherData);




module.exports = router;