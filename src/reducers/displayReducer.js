import { LIST_CLIENT, FORM_CLIENT, EDIT_CLIENT } from "../types";

// Cada reducer tiene su propio state

const initialState = {
  formClient: false,
  listClient: true,
  editClient: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_CLIENT:
      return {
        ...state,
        formClient: false,
        listClient: true,
        editClient: false,
      };

    case FORM_CLIENT:
      return {
        ...state,
        formClient: true,
        listClient: false,
        editClient: false,
      };

    case EDIT_CLIENT:
      return {
        ...state,
        formClient: false,
        listClient: false,
        editClient: true,
      };

    default:
      return state;
  }
}
