import { GET_CLIENTS } from "../types";

export const getClientsSuccess = (clients) => ({
  type: GET_CLIENTS,
  payload: clients,
});