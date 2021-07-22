import {
  DB_FETCH_TXR_SUCCESS,
  DB_FETCH_TXR_FAILED,
  DB_FETCH_FILES_REQUEST,
} from '../constants/actionTypes';

const transactionReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case DB_FETCH_TXR_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case DB_FETCH_FILES_REQUEST:
      return { loading: true, transactions: [] };
    case DB_FETCH_TXR_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
