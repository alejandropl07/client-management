import { GET_CLIENTS, CREATE_CLIENT,  UPDATE_CLIENT, DELETE_CLIENT } from "../types";

export const getClientsSuccess = (clients) => ({
  type: GET_CLIENTS,
  payload: clients,
});

export const createClientSuccess = () => ({
  type: CREATE_CLIENT,
});

export const updateClientSuccess = () => ({
  type: UPDATE_CLIENT,
});

export const deleteClientSuccess = () => ({
  type: DELETE_CLIENT,
});