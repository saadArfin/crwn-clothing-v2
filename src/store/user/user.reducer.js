//Our reducers in redux receive every single action that gets dispatched ever so if none of the cases match to the type, that very reducer needs to return the previous state. 
import { USER_ACTION_TYPES } from "./user.types";  
const INITIAL_STATE = {
    currentUser: null,
  };
  
  export const userReducer = (state = INITIAL_STATE, action) => {//Have to explicitly set initial state as we don't have useReducer hook now.
    console.log("action");
    console.log(action);
    const { type, payload } = action;
  
    switch (type) {
      case USER_ACTION_TYPES.SET_CURRENT_USER:
        return { ...state, currentUser: payload };
      default:
        return state;
    }
  };