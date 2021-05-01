import { ADD_USERROLE, REMOVE_USERROLE } from "./action.types";

export const addUserRole = (role) => ({
  type: ADD_USERROLE,
  payload: role,
});

export const removeUserRole = (index) => ({
  type: REMOVE_USERROLE,
  payload: index,
});
