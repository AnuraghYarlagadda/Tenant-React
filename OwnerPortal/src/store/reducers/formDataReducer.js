import { SET_FORMDATA, CLEAR_FORMDATA } from "../types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FORMDATA:
      return {
        ...state,
        ...payload,
      };
    case CLEAR_FORMDATA:
      return {};
    default:
      return state;
  }
}
