import {
  DB_FETCH_FILES_REQUEST,
  DB_FETCH_TXR_FAILED,
  DB_FETCH_TXR_SUCCESS,
} from '../constants/actionTypes';
import * as api from '../api/index';

export const getTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: DB_FETCH_FILES_REQUEST });
    const { data } = await api.fetchTrts();
    dispatch({ type: DB_FETCH_TXR_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DB_FETCH_TXR_FAILED,
      payload: err.response && err.response.message ? err.response.message : err.message,
    });
  }
};
