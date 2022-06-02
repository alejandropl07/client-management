import React, { Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/axios";
import { getInterestSuccess } from "../actions/interestAction";

function FormClient() {
  const { token } = useSelector((state) => state.user.user);
  const { interest } = useSelector((state) => state.interest);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getInterestAction = (interest) =>
    dispatch(getInterestSuccess(interest));

  const getInterest = async () => {
    await clientAxios
      .get("api/Intereses/Listado", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        getInterestAction(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInterest();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="identificacion"
          label="Identificación"
          placeholder="Identificación"
        />
        <TextField required id="nombre" label="Nombre" placeholder="Nombre" />
        <TextField
          required
          id="apellidos"
          label="Apellidos"
          placeholder="Apellidos"
        />
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="genero-label">Género</InputLabel>
          <Select
            labelId="genero-label"
            id="genero"
            //   value={age}
            label="Género *"
            //   onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="fecha-nacimiento"
          label="Fecha de nacimiento"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
        />

        <TextField
          name="fecha-afiliacion"
          label="Fecha de afiliación"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
        />

        <TextField
          required
          id="tel-cel"
          label="Télefono celular"
          type="number"
          placeholder="Télefono celular"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="tel-otro"
          label="Télefono otro"
          type="number"
          placeholder="Télefono otro"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="interes-label">Interes</InputLabel>
          <Select
            labelId="interes-label"
            id="interes"
            label="Interes *"
            //   onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {interest?.map((int) => (
              <MenuItem key={int.id} value={int.id}>{int.descripcion}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          id="direccion"
          label="Dirección"
          placeholder="Dirección"
        />
        <TextField required id="resena" label="Reseña" placeholder="Reseña" />
      </div>
    </Box>
  );
}

export default FormClient;
