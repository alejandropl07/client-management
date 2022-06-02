import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/axios";
import { getInterestSuccess } from "../actions/interestAction";
import { createClientSuccess } from "../actions/clientsAction";

function FormClient() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefonoCelular, setTelCel] = useState("");
  const [otroTelefono, setOtroTel] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fNacimiento, setFNac] = useState("");
  const [fAfiliacion, setFAfil] = useState("");
  const [sexo, setSexo] = useState("");
  const [resenaPersonal, setResenaPersonal] = useState("");

  const [interestSelect, setInterestSelect] = useState("");

  const handleChangeInterest = (event) => {
    setInterestSelect(event.target.value);
    console.log(interestSelect);
  };

  const { token } = useSelector((state) => state.user.user);
  const { userid } = useSelector((state) => state.user.user);
  const { interest } = useSelector((state) => state.interest);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getInterestAction = (interest) =>
    dispatch(getInterestSuccess(interest));
  const createClientAction = () => dispatch(createClientAction());

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

  const createClient = async (event) => {
    event.preventDefault();
    console.log(nombre);
    console.log(apellidos);
    console.log(identificacion);
    console.log(telefonoCelular);
    console.log(otroTelefono);
    console.log(direccion);
    console.log(fNacimiento);
    console.log(fAfiliacion);
    console.log(sexo);
    console.log(resenaPersonal);
    console.log(interestSelect);
    console.log(userid);
    await clientAxios
      .post(
        "/api/Cliente/Crear",
        {
          nombre,
          apellidos,
          identificacion,
          telefonoCelular,
          otroTelefono,
          direccion,
          fNacimiento,
          fAfiliacion,
          sexo,
          resenaPersonal,
          imagen: "string",
          interesFK: interestSelect,
          usuarioId: userid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        createClientAction();
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
      onSubmit={createClient}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Guardar
        </Button>
        <TextField
          required
          id="identificacion"
          label="Identificación"
          placeholder="Identificación"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
        />
        <TextField
          required
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          required
          id="apellidos"
          label="Apellidos"
          placeholder="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="genero-label">Género</InputLabel>
          <Select
            labelId="genero-label"
            id="genero"
            value={sexo}
            label="Género *"
            onChange={(e) => setSexo(e.target.value)}
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
          value={fNacimiento}
          onChange={(e) => setFNac(e.target.value)}
        />

        <TextField
          name="fecha-afiliacion"
          label="Fecha de afiliación"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          value={fAfiliacion}
          onChange={(e) => setFAfil(e.target.value)}
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
          value={telefonoCelular}
          onChange={(e) => setTelCel(e.target.value)}
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
          value={otroTelefono}
          onChange={(e) => setOtroTel(e.target.value)}
        />

        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="interes-label">Interes</InputLabel>
          <Select
            labelId="interes-label"
            id="interes"
            label="Interes *"
            value={interestSelect}
            onChange={handleChangeInterest}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {interest?.map((int) => (
              <MenuItem key={int.id} value={int.id}>
                {int.descripcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          id="direccion"
          label="Dirección"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <TextField
          required
          id="resena"
          label="Reseña"
          placeholder="Reseña"
          value={resenaPersonal}
          onChange={(e) => setResenaPersonal(e.target.value)}
        />
      </div>
    </Box>
  );
}

export default FormClient;
