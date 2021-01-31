import {
  SET_COUNTER_DECREMENT,
  SET_COUNTER_INCREMENT,
} from "../constants/types";

const initialState = {
  counter: 0,
};

const CounterReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SET_COUNTER_INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case SET_COUNTER_DECREMENT:
      return {
        ...state,
        counter: state.counter > 0 ? state.counter - 1 : 0,
      };
    default:
      return state;
  }
};

export default CounterReducer;
