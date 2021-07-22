import { FETCH_BALANCE_FAILED, FETCH_BALANCE_SUCCESS } from '../constants/actionTypes';

const balanceReducer = (state = { balance: 0 }, action) => {
  switch (action.type) {
    case FETCH_BALANCE_FAILED:
      return { loading: false, error: action.payload };
    case FETCH_BALANCE_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default balanceReducer;
