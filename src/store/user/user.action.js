import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const saveUserData = (data) => {
  return data;
};

const saveUserLocationCaptured = (data) => {
  return data;
};

export const storeUserData = (data) => {
  const storedData = saveUserData(data);
  return createAction(USER_ACTION_TYPES.SET_USER_DATA, storedData);
};

export const changeIsLoggedInUser = () => {
  return createAction(USER_ACTION_TYPES.SET_USER_LOGGED_IN);
};

export const changeIsLoggedOutUser = () => {
  return createAction(USER_ACTION_TYPES.SET_USER_LOGOUT);
};

export const storeUserLocationCaptured = (data) => {
  const storeUserLocationCaptured = saveUserLocationCaptured(data);
  return createAction(
    USER_ACTION_TYPES.SET_USER_LOCATION_CAPTURE,
    storeUserLocationCaptured
  );
};
