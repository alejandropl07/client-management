import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import clientAxios from "../config/axios";

import {
  deleteClientSuccess,
  getClientEditSuccess,
} from "../actions/clientsAction";
import { displayEdit } from "../actions/displayAction";

const Client = ({ client, getClients }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user.user);
  const displayEditAction = () => dispatch(displayEdit());
  const getClientEditAction = (client) =>
    dispatch(getClientEditSuccess(client));

  const editClient = (id) => {
    clientAxios
      .get(`api/Cliente/Obtener/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        getClientEditAction(response.data);
        displayEditAction();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteClient = (event,  id) => {
    event.preventDefault();
    // Confirmacion de Sweet Alert
    Swal.fire({
      title: "Está seguro?",
      text: "No podrá revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clientAxios
          .delete(`api/Cliente/Eliminar/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            Swal.fire("Eliminado!", "El cliente ha sido eliminado.", "success");
            console.log(response);
            getClients();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {client.identificacion}
      </TableCell>
      <TableCell align="right">
        {client.nombre} {client.apellidos}
      </TableCell>
      <TableCell align="right">
        <IconButton aria-label="edit" onClick={() => editClient(client.id)}>
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={(event) => deleteClient(event,  client.id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Client;
