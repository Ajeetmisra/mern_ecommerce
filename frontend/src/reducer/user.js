import { ADD_USERROLE, REMOVE_USERROLE } from "../action/action.types";

var initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERROLE:
      return [...state, action.payload];
    case REMOVE_USERROLE:
      return state.filter((data, index) => index !== action.payload);
    default:
      return state;
  }
};
