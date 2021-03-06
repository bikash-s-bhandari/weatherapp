import { REGISTER_SUCCESS, REGISTER_FAIL, SET_USER, AUTH_ERROR, VERIFIED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER } from '../Helpers/Constants'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const initialState = {
     isAuthenticated: false,
     loading: true,
     token: cookies.get('token'),
     user: null,
     redirectReferer: false,
     verified: false
}


export default function (state = initialState, action) {
     const { type, payload } = action
     switch (type) {
          case REGISTER_SUCCESS:
               return {
                    ...state,
                    redirectReferer: true


               };
          case LOGIN_SUCCESS:
               return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false
               };
          case REGISTER_FAIL:
          case AUTH_ERROR:
          case LOGIN_FAIL:
          case LOGOUT_USER:
               return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false
               };

          case SET_USER:
               return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: payload

               };

          case VERIFIED:
               return {
                    ...state,
                    verified: true
               };


          default:
               return state;




     }


}