import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ weather }) => {

     console.log('we', weather);
     //some logic to get temp, weather icons etc..

     return (
          <div className="container-fluid" style={{ marginTop: '50px' }}>
               <div className="row justify-content-center">
                    <div className="col-12 col-md-4 col-sm-12 col-xs-12">
                         <div className="card p-4">
                              <div className="d-flex">
                                   <h6 className="flex-grow-1">{weather.name}</h6>
                                   <h6>16:08</h6>
                              </div>
                              <div className="d-flex flex-column temp mt-5 mb-3">
                                   <h1 className="mb-0 font-weight-bold" id="heading"> 13° C </h1> <span className="small grey">Stormy</span>
                              </div>
                              <div className="d-flex">
                                   <div className="temp-details flex-grow-1">
                                        <p className="my-1"> <img src="https://i.imgur.com/B9kqOzp.png" height="17px" /> <span> 40 km/h </span> </p>
                                        <p className="my-1"> <i className="fa fa-tint mr-2" aria-hidden="true"></i> <span> 84% </span> </p>
                                        <p className="my-1"> <img src="https://i.imgur.com/wGSJ8C5.png" height="17px" /> <span> 0.2h </span> </p>
                                   </div>
                                   <div> <img src="https://i.imgur.com/Qw7npIg.png" width="100px" /> </div>
                              </div>
                         </div>
                    </div >
               </div >
          </div >
     )
}

Card.propTypes = {
     weather: PropTypes.object.isRequired

}

export default Card
