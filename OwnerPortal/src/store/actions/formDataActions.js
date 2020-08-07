import { SET_FORMDATA, CLEAR_FORMDATA } from "./types";

export const setFormData = (formData) => (dispatch) => {
  dispatch({
    type: SET_FORMDATA,
    payload: formData,
  });
};

export const clearFormData = () => (dispatch) => {
  dispatch({
    type: CLEAR_FORMDATA,
  });
};
