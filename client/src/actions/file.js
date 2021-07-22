import {
  BC_FETCH_FILES_SUCCESS,
  BC_FETCH_FILES_REQUEST,
  BC_FETCH_FILES_FAILED,
} from "../constants/actionTypes";

import * as api from "../api/index";

export const bCgetAllFiles = () => async (dispatch) => {
  try {
    // Showing loading before initiating requst
    dispatch({ type: BC_FETCH_FILES_REQUEST });
    const { data } = await api.fetchLogs();
    dispatch({ type: BC_FETCH_FILES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BC_FETCH_FILES_FAILED,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};
