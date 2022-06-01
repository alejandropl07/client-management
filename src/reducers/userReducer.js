import { LOGIN, REGISTER } from "../types";

// Cada reducer tiene su propio state

const initialState = {
  user: {},
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        error: null,
        user:   action.payload,
      };

    default:
      return state;
  }
}
