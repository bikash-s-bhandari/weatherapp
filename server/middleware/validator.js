const { check } = require('express-validator');

const registerValidation = [
     check('fullName', 'fullName field is required').not().isEmpty(),
     check('email', 'Please include a valid email').isEmail(),
     check('password').isLength({ min: 5, max: 16 }).withMessage('Password must be between 5 to 16 characters'),
     check('confirmPassword').trim().custom(async (confirmPassword, { req }) => {
          const password = req.body.password
          if (password !== confirmPassword) {
               throw new Error('Confirm Password did not match!')
          }
     }),

];

const loginValidation = [
     check('email', 'Please include a valid email').isEmail(),
     check('password', 'Please enter password').isLength({ min: 5 }).withMessage('Password must be between 5 characters'),

];

module.exports = {
     registerValidation,
     loginValidation,

}