import React, { Fragment, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/axios";
import { getInterestSuccess } from "../actions/interestAction";
import { createClientSuccess } from "../actions/clientsAction";
import { validateError, validateSuccess } from "../actions/validateAction";
import Swal from "sweetalert2";

function UpdateClient() {
  const nombreRef = useRef("");
  const apellidosRef = useRef("");
  const identificacionRef = useRef("");
  const telefonoCelularRef = useRef("");
  const otroTelefonoRef = useRef("");
  const direccionRef = useRef("");
  const fNacimientoRef = useRef("");
  const fAfiliacionRef = useRef("");
  const resenaPersonalRef = useRef("");

  const [sexo, setSexo] = useState("");
  const [interestSelect, setInterestSelect] = useState("");

  const { userid } = useSelector((state) => state.user.user);
  const { interest } = useSelector((state) => state.interest);
  const { token } = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getInterestAction = (interest) =>
    dispatch(getInterestSuccess(interest));
  const updateClientAction = () => dispatch(updateClientAction());

  const { client } = useSelector((state) => state.clients);
  const { error } = useSelector((state) => state.validate);

  const successValid = () => dispatch(validateSuccess());
  const errorValid = () => dispatch(validateError());

  const submitEditarCliente = async (event) => {
    event.preventDefault();
    if (
      nombreRef.current.value.trim() === "" ||
      apellidosRef.current.value.trim() === "" ||
      identificacionRef.current.value.trim() === "" ||
      telefonoCelularRef.current.value.trim() === "" ||
      otroTelefonoRef.current.value.trim() === "" ||
      direccionRef.current.value.trim() === "" ||
      fNacimientoRef.current.value.trim() === "" ||
      fAfiliacionRef.current.value.trim() === "" ||
      resenaPersonalRef.current.value.trim() === ""
    ) {
      errorValid();
      return;
    }
    successValid();
    await clientAxios
      .post(
        "/api/Cliente/Actualizar",
        {
          nombre: nombreRef,
          apellidos: apellidosRef,
          identificacion: identificacionRef,
          celular: telefonoCelularRef,
          otroTelefono: otroTelefonoRef,
          direccion: direccionRef,
          fNacimiento: fNacimientoRef,
          fAfiliacion: fAfiliacionRef,
          sexo,
          resennaPersonal: resenaPersonalRef,
          interesFK: interestSelect,
          usuarioId: userid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error!",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar!",
        })
        console.log(error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={submitEditarCliente}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton aria-label="clients">
            <AccountCircleIcon /> Mantenimiento de clientes
          </IconButton>

          <IconButton aria-label="save" type="submit">
            <SaveIcon />
            Guardar
          </IconButton>
          <IconButton aria-label="back">
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
            required
            id="identificacion"
            label="Identificación"
            placeholder="Identificación"
            ref={identificacionRef}
            defaultValue={client?.identificacion}
          />

          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="nombre"
            label="Nombre"
            placeholder="Nombre"
            ref={nombreRef}
            defaultValue={client?.nombre}
          />
          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="apellidos"
            label="Apellidos"
            placeholder="Apellidos"
            ref={apellidosRef}
            defaultValue={client?.apellidos}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl required sx={{ m: 1, minWidth: "20%" }}>
            <InputLabel id="genero-label">Género</InputLabel>
            <Select
              labelId="genero-label"
              id="genero"
              label="Género *"
              onChange={(e) => setSexo(e.target.value)}
            >
              <MenuItem value={client?.sexo}>
                <em>None</em>
              </MenuItem>
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Femenino</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{ minWidth: "20%" }}
            name="fecha-nacimiento"
            label="Fecha de nacimiento"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            ref={fNacimientoRef}
            value={client?.fNacimiento}
          />

          <TextField
            sx={{ minWidth: "20%" }}
            name="fecha-afiliacion"
            label="Fecha de afiliación"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            ref={fAfiliacionRef}
            value={client?.fAfiliacion}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="tel-cel"
            label="Teléfono celular"
            placeholder="Teléfono Celular"
            defaultValue={client?.telefonoCelular}
            InputLabelProps={{
              shrink: true,
            }}
            ref={telefonoCelularRef}
          />
          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="tel-otro"
            label="Teléfono otro"
            placeholder="Teléfono Otro"
            InputLabelProps={{
              shrink: true,
            }}
            ref={otroTelefonoRef}
            defaultValue={client?.otroTelefono}
          />

          <FormControl required sx={{ m: 1, minWidth: "20%" }}>
            <InputLabel id="interes-label">Interés</InputLabel>
            <Select
              labelId="interes-label"
              id="interes"
              label="Interes"
              onChange={(e) => setInterestSelect(e.target.value)}
            >
              <MenuItem value={client?.interesesId}>
                <em>None</em>
              </MenuItem>
              {interest?.map((int) => (
                <MenuItem key={int.id} value={int.id}>
                  {int.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginLeft: "295px" }}>
          <TextField
            sx={{ minWidth: "76%" }}
            required
            id="direccion"
            label="Dirección"
            placeholder="Dirección"
            ref={direccionRef}
            defaultValue={client?.direccion}
          />
        </Box>
        <Box sx={{ marginLeft: "295px" }}>
          <TextField
            sx={{ minWidth: "76%" }}
            required
            id="resena"
            label="Reseña"
            placeholder="Reseña"
            ref={resenaPersonalRef}
            defaultValue={client?.resenaPersonal}
          />
        </Box>
      </div>
      {error ? (
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Todos los campos son obligatorios
        </Typography>
      ) : null}
    </Box>
  );
}

export default UpdateClient;
