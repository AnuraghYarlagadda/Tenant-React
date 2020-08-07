import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import alert from "./alertReducer";
import formData from "./formDataReducer";

export default combineReducers({
  alert: alert,
  formData: formData,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
