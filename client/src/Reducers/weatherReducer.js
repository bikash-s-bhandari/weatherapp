import { SET_WEATHER } from '../Helpers/Constants'
const initialState = {
     weather: null
};


export default function (state = initialState, action) {
     const { type, payload } = action;
     switch (type) {
          case SET_WEATHER:
               return {
                    ...state,
                    weather: payload.data

               };

          default:
               return state;




     }


}