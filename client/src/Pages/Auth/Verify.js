import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verifyEmail } from '../../Actions/authAction'
import { connect } from 'react-redux'
const Verify = (props) => {
     const { verified } = props;
     const { token } = useParams();
     const dispatch = useDispatch()

     const verify = () => {

          dispatch(verifyEmail(token));




     }

     useEffect(() => {

          if (token) {
               verify()

          }



     }, [token])

     return (
          <>
               {verified ? (
                    <>
                         <h3>Verification Success,please login</h3>
                         <Link to="/login">Login</Link>
                    </>
               ) : (
                         <button>Resend Verification Link</button>

                    )}

          </>
     )
}

const mapStateToProps = state => ({
     verified: state.auth.verified

});

export default connect(mapStateToProps, null)(Verify)
