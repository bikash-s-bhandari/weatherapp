import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../Actions/authAction'
const Header = ({ auth: { isAuthenticated }, logoutUser }) => {

     const authLinks = (
          <ul>
               <li>
                    <Link to="/dashboard">
                         <i className="fas fa-user" />{' '}
                         <span className="hide-sm">Dashboard</span>
                    </Link>
               </li>
               <li>
                    <a onClick={logoutUser} href="#!">
                         <i className="fas fa-sign-out-alt"></i>{' '}
                         <span className="hide-sm">Logout</span>
                    </a>
               </li>


          </ul>


     )

     const guestLinks = (
          <ul className="nav navbar-nav">
               {/* <li>
                    <a href="">Home</a>

               </li> */}
               <li><Link to="/login">Login</Link></li>
               <li><Link to="/register">Register</Link></li>

          </ul>


     )
     return (
          <nav className="navbar bg-dark">
               <div className="container-fluid">
                    <div className="navbar-header">
                         <Link to="/"><i className="fas fa-code"></i> Weather App</Link>
                    </div>

                    <>
                         {isAuthenticated ? authLinks : guestLinks}
                    </>
               </div>

          </nav >

     )
}

Header.propTypes = {
     logoutUser: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
     auth: state.auth

});

const mapActionsToProps = {

     logoutUser
};




export default connect(mapStateToProps, mapActionsToProps)(Header)
