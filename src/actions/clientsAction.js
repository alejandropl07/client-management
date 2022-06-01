import { GET_CLIENTS, CREATE_CLIENT,  UPDATE_CLIENT, DELETE_CLIENT } from "../types";

export const getClientsSuccess = (clients) => ({
  type: GET_CLIENTS,
  payload: clients,
});