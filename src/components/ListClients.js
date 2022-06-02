import React, { Fragment, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clientAxios from "../config/axios";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import { getClientsSuccess } from "../actions/clientsAction";
import { useDispatch } from "react-redux";
import Client from "./Client";

function ListClients() {
  //const [{ clients },   dispatch] = useStateValue();
  const [results, setResults] = useState();
  const { token } = useSelector((state) => state.user.user);
  const { userid } = useSelector((state) => state.user.user);
  const { clients } = useSelector((state) => state.clients);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getClientsAction = (clients) => dispatch(getClientsSuccess(clients));

  const getClients = async () => {
    console.log(userid);
    await clientAxios
      .post(
        "api/Cliente/Listado",
        { usuarioid: userid },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        /*  dispatch({
          type: actionTypes.GET_CLIENTS,
          item: results,
        });*/
        console.log(response);
        getClientsAction(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClients();
    console.log(clients);
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Identificación</TableCell>
            <TableCell align="right">Nombre completo</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients?.map((client) => (
            <Client key={client.identificacion} client={client} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListClients;
