const Weather = require('../models/Weather')
const ErrorResponse = require('../utils/error_response')
const asyncHandler = require('../middleware/async_handler')

const fetch = require('node-fetch');


//@description: Get Weather Information
//@route : POST /api/v1/weather/get
//@access :Private 

exports.getWeatherData = asyncHandler(async (req, res, next) => {


     const { location } = req.query
     const API_KEY = process.env.WHEATHER_API_KEY;
     const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
     fetch(url)
          .then(response => { return response.json(); })
          .then(async (data) => {

               let weather = await Weather.findOne({ id: data.id });
               if (!weather) {
                    weather = await Weather.create(data)

               }
               return res.json(
                    {
                         success: true,
                         data: weather
                    })

          })
          .catch(async (err) => {
               if (err.code === 'ENOTFOUND' && err.type === 'system') {
                    let weather = await Weather.findOne({ name: new RegExp('^' + location + '$', "i") });
                    if (!weather) {
                         return next(new ErrorResponse(`Data not found with city ${location}`, 400));
                    }
                    return res.json(
                         {
                              success: true,
                              data: weather
                         })


               }

               return res.status(500).json({ success: false, 'msg': 'Something went wrong' })


          });


});