const ErrorResponse = require('../utils/error_response')
const errorHandler = (err, req, res, next) => {
     let error = { ...err }
     console.log('errname', error.name)
     console.log(error.message)
     error.message = err.message
     //Mongoose wrong ObjectId
     if (error.name === 'CastError') {
          const message = `Bad Mongoose ObjectId ${error.value}`;
          error = new ErrorResponse(message, 404)
     }

     //Mongoose duplicate key error
     if (error.code === 11000) {
          const message = 'Duplicate field value entered!'
          error = new ErrorResponse(message, 400)//status is 400 because bad request from client

     }
     //Mongoose validation error

     if (error.name === "ValidationError") {
          const message = Object.values(err.errors);

          error = new ErrorResponse(message, 400)
     }

     //jwt expire error
     if (error.name === 'TokenExpiredError') {
          const message = `The email token is expired!`;
          error = new ErrorResponse(message, 404)

     }

     if (error.name === 'JsonWebTokenError') {
          const message = `The token is invalid, please provide valid token!`;
          error = new ErrorResponse(message, 404)

     }


     res.status(error.statusCode || 500).json({
          success: false,
          msg: error.message || 'Server Error'
     })

}
module.exports = errorHandler