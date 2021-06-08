const express = require('express');
const dotenv = require('dotenv');
require('colors');
const path = require('path')

const connectDB = require('./config/db');
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errors')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors')




//load .env variables
var let = dotenv.config({ path: __dirname + '/config/config.env' })

//connect to databse
connectDB()

//initalizing app
const app = express();

app.use(express.json());

app.use(cookieParser());
//prevent from NoSql injection
app.use(mongoSanitize());

//xss clean security prevent xss atack
app.use(xss());

//rate limiting
const limiter = rateLimit({
     windowMs: 10 * 60 * 1000,
     max: 10
});

app.use(limiter);

//prevent http parameter pollution
app.use(hpp());

//Cors
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

//Routes
const auth = require('./router/auth')
const weather = require('./router/weather')

//for logging purpose, require only for dev
if (process.env.NODE_ENV == 'development') {
     app.use(morgan('dev'))
}




//Mount Routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/weather', weather)


//error handler
app.use(errorHandler);

//running the server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
     console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT}`.yellow.bold)

});

//handle unhandle promise rejection

process.on('unhandledRejection', (err, promise) => {
     console.log(`Error: ${err.message}`.red)
     //close server and exit process
     server.close(() => process.exit(1));

});