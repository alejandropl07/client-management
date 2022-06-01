import { GET_CLIENTS } from "../types";

// Cada reducer tiene su propio state

const initialState = {
  clients: [],
  error: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        error: null,
        clients:   action.payload,
      };

    default:
      return state;
  }
}