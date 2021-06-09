import React, { useState } from 'react'
import { getWeather } from '../../Actions/weatherAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Card from '../../Components/Weather/Card'

const Dashboard = (props) => {
     const { weather, getWeather } = props;




     const [city, setCity] = useState('Kathmandu');
     const [loading, setLoading] = useState(false)
     const [show, setShow] = useState(false)


     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true)
          await getWeather(city)
          setShow(true)
          setLoading(false)


     }







     return (
          <div style={{ marginTop: '100px' }}>
               <div className="row">
                    <div className="col-md-12">
                         <h2>Get Todays weather info</h2>
                    </div>

               </div>
               <div className="row">
                    <div className="col-md-4">

                         <input
                              type="text"
                              className="form-control"
                              name="city"
                              placeholder="Enter City Name"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}

                         />

                    </div>
                    <div className="col-md-3">
                         <button type="button" onClick={handleSubmit} className="btn btn-success">Get Weather</button>
                    </div>

               </div>

               <div className="row">
                    <div className="col-md-12">

                         {
                              loading ? (
                                   <div>Loading.....</div>
                              ) : (

                                        show && (
                                             <Card weather={weather} />

                                        )



                                   )




                         }



                    </div>
               </div>


          </div>
     )
}

Dashboard.propTypes = {
     getWeather: PropTypes.func.isRequired,
     weather: PropTypes.object

}
const mapStateToProps = state => ({
     weather: state.weather.weather

});
const mapActionsToProps = {
     getWeather

};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)
