import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_USER, AUTH_ERROR, VERIFIED, LOGOUT_USER } from '../Helpers/Constants'
import { setAlert } from './alertAction'
import { Axios, setAuthToken } from '../Helpers/Axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const config = {
     headers: {
          "Content-Type": "application/json"
     }
}
export const registerUser = ({ fullName, email, password, confirmPassword }) => async (dispatch) => {

     const body = { fullName, email, password, confirmPassword };

     try {
          const res = await Axios.post('/auth/register', body, config);
          dispatch(setAlert('Registration success,please verify your email to login', 'success'));
          dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data

          });

     } catch (err) {
          const errors = err.response.data.errors;
          if (errors) {
               errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
          }
          dispatch({
               type: REGISTER_FAIL,


          });


     }





}

export const loginUser = (body) => (dispatch) => {

     Axios.post('/auth/login', body, config)
          .then((res) => {

               const token = `Bearer ${res.data.token}`;
               setAuthToken(token)
               dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.data
               })
               dispatch(getUserData());



          })
          .catch((err) => {
               const errors = err.response.data
               console.log(errors.msg)
               dispatch(setAlert(errors.msg, 'danger'))


               dispatch({
                    type: LOGIN_FAIL,


               });

          });
}

export const getUserData = () => (dispatch) => {
     Axios.get('/auth/me')
          .then(res => {

               cookies.set('user', res.data.data)
               dispatch({
                    type: SET_USER,
                    payload: res.data.data

               });

          }).catch(err => {

               dispatch({
                    type: AUTH_ERROR
               })

          });


}

export const logoutUser = () => (dispatch) => {
     delete Axios.defaults.headers.common['Authorization']//deleting the entry
     cookies.remove('token');
     cookies.remove('user');
     dispatch({
          type: LOGOUT_USER

     });




};

export const verifyEmail = (token) => async (dispatch) => {
     const res = Axios.post('/auth/user/verify', { activation_token: token }, config).then(res => {
          console.log(res)
          dispatch({
               type: VERIFIED,

          });


     }).catch(err => {
          console.log(err)
     })



};