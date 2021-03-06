import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { getUserData } from '../Actions/authAction'
import store from '../store';
import { Axios } from '../Helpers/Axios';
import { SET_USER } from '../Helpers/Constants'

const cookies = new Cookies();
export const CheckAuthentication = () => {
     const token = cookies.get('token');
     if (token) {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
               // store.dispatch(logoutUser());
               //get refresh token here


          } else {
               const user = cookies.get('user');
               store.dispatch({ type: SET_USER, payload: user });
               Axios.defaults.headers.common['Authorization'] = token;
               store.dispatch(getUserData());

          }

     }






}