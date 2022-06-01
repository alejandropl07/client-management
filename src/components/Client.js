import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

//import { deleteClientAction } from "../actions/clientsAction";

const Client = ({ client }) => {
  const dispatch = useDispatch();

  const deleteClient = (id) => {
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
        Swal.fire("Eliminado!", "El cliente ha sido eliminado.", "success");
        console.log(id);
       // dispatch(deleteClientAction(id));
      }
    });
  };

  return (
    <tr>
      <td>{client.identificacion}</td>
      <td>
        <Link
          to={`/clients/editar/${client.id}`}
          className="btn btn-primary mr-2"
        >
          Editar
        </Link>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
        <button
          className="btn btn-danger"
          onClick={() => deleteClient(client.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Client;