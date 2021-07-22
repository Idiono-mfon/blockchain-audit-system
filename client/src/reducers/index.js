import { combineReducers } from 'redux';
import files from './file';
// import logs from "./log";
import trxs from './transaction';

import balance from './balance';

export default combineReducers({ balance, files, trxs });
