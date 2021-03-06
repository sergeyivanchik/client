import { combineReducers } from 'redux';
import seats  from './seats.js';
import cinemas from './cinemas.js';
import halls from './halls.js';
import movies from './movies.js';
import sessions from './sessions.js';
import loader from './loader.js';
import snackbar from './snackbar';
import user from './users.js';

const allReducers = combineReducers ({
  seats,
  cinemas,
  halls,
  movies,
  sessions,
  loader,
  snackbar,
  user
})

export default allReducers
