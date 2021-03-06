import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { getClientsSuccess } from "../actions/clientsAction";
import { useDispatch } from "react-redux";
import Client from "./Client";
import { displayForm, displayWelcome } from "../actions/displayAction";

function ListClients() {
  //const [{ clients },   dispatch] = useStateValue();
  const { token } = useSelector((state) => state.user.user);
  const { userid } = useSelector((state) => state.user.user);
  const { clients } = useSelector((state) => state.clients);

  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");

  const nombreRef = useRef("");
  const identificacionRef = useRef("");

  const onChangeNombre = (value) => {
    setNombre(value);
  };

  const onChangeIdentificacion = (value) => {
    setIdentificacion(value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getClientsAction = (clients) => dispatch(getClientsSuccess(clients));
  const displayFormAction = () => dispatch(displayForm());
  const displayWelcomeAction = () => dispatch(displayWelcome());

  const showFormClient = () => {
    displayFormAction();
  };

  const showWelcome = () => {
    displayWelcomeAction();
  };

  const getClients = async () => {
    await clientAxios
      .post(
        "api/Cliente/Listado",
        { usuarioid: userid, identificacion, nombre },
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

  const getClientsFilter = async (event) => {
    event.preventDefault();
    await clientAxios
      .post(
        "api/Cliente/Listado",
        { usuarioid: userid, identificacion, nombre },
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
  }, []);
  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton aria-label="clients">
            <AccountCircleIcon /> Consulta de clientes
          </IconButton>

          <IconButton aria-label="save" onClick={showFormClient}>
            <AddIcon />
            Agregar
          </IconButton>
          <IconButton aria-label="back" onClick={showWelcome}>
            <KeyboardBackspaceIcon />
            Regresar
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ minWidth: "20%" }}
            id="nombre"
            label="Nombre"
            placeholder="Nombre"
            inputRef={nombreRef}
            onChange={() => onChangeNombre(nombreRef.current.value)}
          />

          <TextField
            sx={{ minWidth: "20%" }}
            id="identificacion"
            label="Identificaci??n"
            placeholder="Identificaci??n"
            inputRef={identificacionRef}
            onChange={() =>
              onChangeIdentificacion(identificacionRef.current.value)
            }
          />

          <IconButton
            aria-label="search"
            onClick={(event) => getClientsFilter(event)}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Identificaci??n</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Nombre completo</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((client) => {
              if (client.nombre.toLowerCase().includes(nombre.toLowerCase())  &&  client.identificacion.toLowerCase().includes(identificacion.toLowerCase()))
                return (
                  <Client
                    key={client.id}
                    client={client}
                    getClients={getClients}
                  />
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default ListClients;
