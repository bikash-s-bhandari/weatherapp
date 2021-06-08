import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { setAlert } from '../../Actions/alertAction'
import { loginUser } from '../../Actions/authAction'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

const Login = (props) => {
     const { setAlert, loginUser, isAuthenticated } = props;

     const [values, setValues] = useState({
          email: '',
          password: ''
     });

     const handleChange = (event) => {
          console.log(event.target.value)
          setValues(values => ({
               ...values,
               [event.target.name]: event.target.value,
          }));


     }

     const handleSubmit = (event) => {
          event.preventDefault();
          if (values.email == '') {
               setAlert('Please enter email! ', 'danger')
          } else if (values.password == '') {
               setAlert('Please enter password! ', 'danger')

          } else {
               loginUser(values);

          }

     }

     //redirect of login
     if (isAuthenticated) {
          return < Redirect to="/dashboard" />
     }
     return (
          <>
               <div style={{ marginTop: '100px' }}>
                    <div className="row">
                         <div className="col-md-4">
                              <h2>Login</h2>
                              <form onSubmit={handleSubmit}>
                                   <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input
                                             type="email"
                                             className="form-control"
                                             name="email"
                                             value={values.email}
                                             onChange={handleChange}
                                             placeholder="Enter Email"

                                        />

                                   </div>
                                   <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                             type="password"
                                             className="form-control"
                                             name="password"
                                             placeholder="Enter Password"
                                             value={values.password}
                                             onChange={handleChange}

                                        />
                                   </div>

                                   <button type="submit" className="btn btn-primary">Login</button>
                              </form>
                         </div>
                    </div>
               </div>

          </>
     )
}

Login.propTypes = {
     setAlert: PropTypes.func.isRequired,
     loginUser: PropTypes.func.isRequired,
     isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
     isAuthenticated: state.auth.isAuthenticated

});
const mapActionsToProps = {
     setAlert,
     loginUser
};



export default connect(mapStateToProps, mapActionsToProps)(Login)