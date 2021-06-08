
import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Layouts/Header'
import Footer from './Components/Layouts/Footer'
import Home from './Pages/Home';
import About from './Pages/About';
import Alert from './Components/Layouts/Alert'
import Verify from './Pages/Auth/Verify'
//redux stuff
import { Provider } from 'react-redux';
import store from './store';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Dashboard from './Pages/User/Dashboard'
import { CheckAuthentication } from './Utils/CheckAuthentication'
import PrivateRoute from './Utils/PrivateRoute'

function App() {
  const initialLoad = async () => {
    CheckAuthentication();

  };

  useEffect(() => {
    initialLoad();


  }, [])
  return (
    <>
      <Provider store={store}>

        <Router>
          <Header />
          <div className="container mt-5">
            <Alert />
            <Switch>


              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/user/activate/:token" component={Verify} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />


            </Switch>
          </div>

          <Footer />

        </Router>

      </Provider>
    </>

  );
}

export default App;
