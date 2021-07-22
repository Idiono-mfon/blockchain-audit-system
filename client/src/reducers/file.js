import {
  BC_FETCH_FILES_SUCCESS,
  BC_FETCH_FILES_FAILED,
  BC_FETCH_FILES_REQUEST,
  DB_FETCH_FILES_FAILED,
  DB_FETCH_FILES_REQUEST,
  DB_FETCH_FILES_SUCCESS,
} from "../constants/actionTypes";

const fileReducer = (files = { bc: [] }, action) => {
  switch (action.type) {
    case BC_FETCH_FILES_REQUEST:
      return { loading: true, bc: [] };
    case BC_FETCH_FILES_FAILED:
      return { loading: false, error: action.payload };
    case BC_FETCH_FILES_SUCCESS:
      return { ...files, loading: false, bc: action.payload };
    case DB_FETCH_FILES_REQUEST:
      return { loading: true, db: [] };
    case DB_FETCH_FILES_FAILED:
      return { loading: false, error: action.payload };
    case DB_FETCH_FILES_SUCCESS:
      return { ...files, loading: false, db: action.payload }; //
    default:
      return files;
  }
};

export default fileReducer;
