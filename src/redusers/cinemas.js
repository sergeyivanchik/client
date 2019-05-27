import { GET_CINEMAS_SUCCESS, GET_CINEMAS_FAILURE } from '../constants/cinemas.js';


const initialState = {
  allCinemas: [],
  error: ''
}

export default function getCinemas(state = initialState, action) {
  switch (action.type) {
    case GET_CINEMAS_SUCCESS:
      return Object.assign({}, state, {
        allCinemas: action.payload
      })

    case GET_CINEMAS_FAILURE: 
      return Object.assign({}, state, {
        error: action.payload
      })
      
    default:
      return state;
}}
