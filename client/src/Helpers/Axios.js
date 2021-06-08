import axios from 'axios'
import Cookies from 'universal-cookie';
import store from '../store';
import { logoutUser } from '../Actions/authAction';
const cookies = new Cookies();
export const Axios = axios.create({
     baseURL: 'http://localhost:5000/api/v1',
     headers: {
          'Content-Type': 'application/json'
     }


});

export const setAuthToken = (token) => {
     if (token) {
          cookies.set('token', token);
          Axios.defaults.headers.common['Authorization'] = token;

     } else {
          cookies.remove('token');
          delete Axios.defaults.headers.common['Authorization'];

     }

}



Axios.interceptors.response.use(
     res => res,
     err => {
          if (err.response.status === 401) {
               store.dispatch(logoutUser());
          }
          return Promise.reject(err);
     }
);