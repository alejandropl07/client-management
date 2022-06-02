import { LIST_CLIENT, FORM_CLIENT, EDIT_CLIENT } from "../types";

export const displayList = () => ({
  type: LIST_CLIENT,
});

export const displayForm = () => ({
  type: FORM_CLIENT,
});

export const displayEdit = () => ({
  type: EDIT_CLIENT,
});
