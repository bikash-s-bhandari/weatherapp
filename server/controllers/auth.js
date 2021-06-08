const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/error_response')
const asyncHandler = require('../middleware/async_handler')
const crypto = require('crypto')
const { validationResult } = require('express-validator');
const { sendMail } = require('../utils/mail/index');


//@description: Resgister User
//@route : POST /api/v1/auth/register
//@access :Public 

exports.registerUser = asyncHandler(async (req, res, next) => {

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
     }
     const { fullName, email, password } = req.body
     const user = await User.findOne({ email });

     if (user) return next(new ErrorResponse(`This email already exists.`, 400));
     const newUser = await User.create({
          fullName,
          email,
          password,

     });
     const payload = {
          id: newUser._id,
          email: newUser.email,
          password: newUser.password
     }
     const activation_token = createActivationToken(payload)
     const link = `${process.env.CLIENT_URL}/user/activate/${activation_token}`
     sendMail(newUser.email, newUser.fullName, link, 'registration');
     res.json(
          {
               success: true,
               msg: "Register Success! Please activate your email to start."
          })

});

exports.activateEmail = asyncHandler(async (req, res) => {

     const { activation_token } = req.body
     const userData = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
     if (userData) {
          const { email } = userData;
          const user = await User.findOne({ email })
          user.verified = true;
          user.save();
          return res.status(200).json({ success: true, msg: "Account has been activated!" })
     } else {
          return res.status(400).json({ success: false, error: "The email address couldn't be verify!" })

     }
});


//@description: Login User
//@route : POST /api/v1/auth/login
//@access :Public 

exports.loginUser = asyncHandler(async (req, res, next) => {

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
     }
     //login user either username or email
     const { password, username } = req.body;
     if (/\@/.test(username)) {
          data = {
               email: username,
          };
     }
     else {
          data = {
               username: username,

          };

     }

     //check user exist or not by email
     const user = await User.findOne(data).select('+password');

     if (!user) {
          return next(new ErrorResponse(`The user doesn't exist with provided email`, 400));

     }

     //check if password is correct and matches
     const isMatch = await user.matchPassword(password);
     if (!isMatch) {
          return next(new ErrorResponse(`The password is incorrect`, 400));

     }

     if (!user.verified) return res.status(401).send({ success: false, msg: 'Your account has not been verified. Please verify your email!' });
     if (!user.account_status) return res.status(401).send({ success: false, msg: 'Your account has disabled by admin, please contact administrator!' });

     const message = 'You are successfully logged in!';

     sendTokenResponse(user, 200, message, res);




});


//@description: Get current loggedin user
//@route : POST /api/v1/auth/me
//@access :Private

exports.getCurrentUser = asyncHandler(async (req, res, next) => {
     const user = await User.
          findById(req.user._id)
     res.status(200).json({ success: true, data: user });

});




exports.getRefreshToken = (req, res) => {
     let token;
     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          token = req.headers.authorization.split(' ')[1];
          console.log('Token', token);
          try {
               jwt.verify(token, process.env.JWT_SECRETE, function (err, decoded) {
                    if (err) {
                         if (err.name === 'TokenExpiredError') {

                              let userid = jwt.decode(token).id
                              User.findById(userid, (err, user) => {
                                   if (err) res.status(500).json({ success: false, msg: "Server Error" })
                                   if (user) {
                                        const payload = {
                                             id: user._id,

                                        }

                                        const refresh_token = jwt.sign(payload, process.env.JWT_SECRETE, { expiresIn: '7d' })
                                        console.log('Refresh Token', refresh_token);
                                        res.status(200).json({ success: true, token: refresh_token })
                                   }
                              })
                         } else {
                              res.status(500).json({ success: false, msg: "Token cannot be read" })
                         }
                    } else {
                         res.status(400).json({ success: false, msg: "Token Still Active" })
                    }
               });


          } catch (error) {
               return res.status(500).json({ success: false, msg: 'There was some problem parsing the token' });
          }

     } else {
          res.status(400).json({ success: false, msg: "No token found" })

     }





}




exports.logout = asyncHandler(async (req, res, next) => {
     res.cookie('token', 'none', {
          expires: new Date(Date.now() + 10 * 1000),
          httpOnly: true
     });

     res.status(200).json({
          success: true,
          msg: 'User successfully logged out!'
     });


});


const createActivationToken = (payload) => {
     return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const sendTokenResponse = async (user, statusCode, message, res) => {
     const token = await user.getSignedJwtToken();
     const options = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),//1 day
          httpOnly: true,//access through only client side
     }
     if (process.env.NODE_ENV === 'production') {
          options.secure = true

     }
     res.status(statusCode).cookie('token', token, options).json({ success: true, msg: message, token })



}



