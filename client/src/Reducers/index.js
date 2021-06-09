import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import weatherReducer from './weatherReducer'



export default combineReducers({
     auth: authReducer,
     alert: alertReducer,
     weather: weatherReducer

});