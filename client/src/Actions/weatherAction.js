import { SET_WEATHER } from '../Helpers/Constants'
import { Axios } from '../Helpers/Axios'
const config = {
     headers: {
          "Content-Type": "application/json"
     }
}
export const getWeather = (city) => async (dispatch) => {

     try {
          const res = await Axios.get(`/weather/get?location=${city}`, config);


          dispatch({
               type: SET_WEATHER,
               payload: res.data

          });

     } catch (err) {
          console.log('err', err)



     }





}