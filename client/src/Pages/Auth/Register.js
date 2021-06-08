import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../Actions/alertAction'
import { registerUser } from '../../Actions/authAction'
import PropTypes from 'prop-types'

const initialValues = {
     fullName: '',
     email: '',
     password: '',
     confirmPassword: ''

}

const Register = (props) => {
     const { setAlert, registerUser } = props;
     const [values, setValues] = useState(initialValues);

     const handleChange = (event) => {
          setValues(values => ({
               ...values,
               [event.target.name]: event.target.value,
          }));

     }

     const handleSubmit = (event) => {
          event.preventDefault();
          if (values.password !== values.confirmPassword) {
               setAlert('Confirm password did not match! ', 'danger')
          } else {
               registerUser(values);
               setValues(initialValues)
          }


     }



     return (
          <>
               <div style={{ marginTop: '100px' }}>
                    <div className="row">
                         <div className="col-md-4">
                              <h2>Register</h2>
                              <form onSubmit={handleSubmit}>
                                   <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             placeholder="Full Name"
                                             name="fullName"
                                             value={values.fullName}
                                             onChange={handleChange}
                                        />

                                   </div>
                                   <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                             type="email"
                                             className="form-control"
                                             placeholder="Email Address"
                                             name="email"
                                             value={values.email}
                                             onChange={handleChange}
                                        />

                                   </div>
                                   <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                             type="password"
                                             className="form-control"
                                             placeholder="password"
                                             name="password"
                                             minLength="6"
                                             value={values.password}
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <div className="form-group">
                                        <input
                                             type="password"
                                             className="form-control"
                                             placeholder="Confirm Password"
                                             name="confirmPassword"
                                             value={values.confirmPassword}
                                             onChange={handleChange}
                                        />
                                   </div>

                                   <button type="submit" className="btn btn-primary">Register</button>
                              </form>
                         </div>
                    </div>
               </div>

          </>
     )
}

const mapActionsToProps = {
     setAlert,
     registerUser
};



Register.propTypes = {
     setAlert: PropTypes.func.isRequired,
     registerUser: PropTypes.func.isRequired,

}

export default connect(null, mapActionsToProps)(Register)


