import {
  SET_COUNTER_DECREMENT,
  SET_COUNTER_INCREMENT,
} from "../constants/types";

export const setCounter = (setVal) => (dispatch) => {
  if (setVal === "increment") {
    dispatch({ type: SET_COUNTER_INCREMENT });
  } else if (setVal === "decrement") {
    dispatch({ type: SET_COUNTER_DECREMENT });
  }
};
