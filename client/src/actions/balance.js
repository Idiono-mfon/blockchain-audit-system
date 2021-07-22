import { FETCH_BALANCE_FAILED, FETCH_BALANCE_SUCCESS } from '../constants/actionTypes';

import * as api from '../api/index';

export const getBalance = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBalance();
    dispatch({ type: FETCH_BALANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_BALANCE_FAILED,
      payload: error.response && error.response.message ? error.response.message : error.message,
    });
  }
};
