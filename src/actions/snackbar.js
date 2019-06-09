import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../constants/snackbar.js';

export const showSnackbar = message => ({
  type: SHOW_SNACKBAR,
  payload: message
})

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR
})