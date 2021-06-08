const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.authMiddleware = async (req, res, next) => {
     let token;
     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

          token = req.headers.authorization.split(' ')[1];
     }
     else {

          return res.status(401).json({ success: false, msg: 'Unauthorized!' })
     }
     if (!token) {
          return res.status(401).json({ success: false, msg: 'No token, authorization dennied!' })
     }


     if (isTokenExpired(token)) {
          return res.status(400).json({ success: false, msg: 'Token has expired!' })

     }

     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRETE);
          const user = await User.findById(decoded.id);
          if (!user) {
               return res.status(401).json({ success: false, msg: 'Token miss match!' })

          }
          req.user = user;
          next();

     } catch (error) {

          res.status(401).json({ success: false, msg: 'Token is not valid!' })

     }




};

const isTokenExpired = (token) => {
     if (token && jwt.decode(token)) {
          const expiry = jwt.decode(token).exp;
          const now = new Date();
          return now.getTime() > expiry * 1000;
     }
     return false;
}







