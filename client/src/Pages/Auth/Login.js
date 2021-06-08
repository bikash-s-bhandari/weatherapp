import React from 'react'

const Login = () => {
     return (
          <>
               <div style={{ marginTop: '100px' }}>
                    <div className="row">
                         <div className="col-md-4">
                              <h2>Login</h2>
                              <form>
                                   <div className="mb-3">
                                        <label className="form-label">Email address</label>
                                        <input
                                             type="email"
                                             className="form-control"
                                        />

                                   </div>
                                   <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                             type="password"
                                             className="form-control"
                                             id="exampleInputPassword1" />
                                   </div>

                                   <button type="submit" className="btn btn-primary">Login</button>
                              </form>
                         </div>
                    </div>
               </div>

          </>
     )
}

export default Login
