import React from 'react'

const Register = () => {
     return (
          <>
               <div style={{ marginTop: '100px' }}>
                    <div className="row">
                         <div className="col-md-4">
                              <h2>Register</h2>
                              <form>
                                   <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             id="exampleInputEmail1"
                                             aria-describedby="emailHelp" />

                                   </div>
                                   <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                             type="email"
                                             className="form-control"
                                             id="exampleInputEmail1"
                                             aria-describedby="emailHelp" />

                                   </div>
                                   <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                             type="password"
                                             className="form-control"
                                             id="exampleInputPassword1" />
                                   </div>

                                   <button type="submit" className="btn btn-primary">Register</button>
                              </form>
                         </div>
                    </div>
               </div>

          </>
     )
}

export default Register
