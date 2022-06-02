import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import clientAxios from "../config/axios";
import { actionTypes } from "../reducer";
import { StateContext, useStateValue } from "../StateProvider";

import { useNavigate } from "react-router-dom";
import { loginAction, loginSuccess } from "../actions/userAction";
import { useDispatch } from "react-redux";

const theme = createTheme();

export default function Login() {
  const [results, setResults] = useState();
  // const { data } = useContext(StateContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (user) => dispatch(loginSuccess(user));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Consultar la API
    await clientAxios
      .post("api/Authenticate/login", {
        username: data.get("user"),
        password: data.get("password"),
      })
      .then((response) => {
        // setResults(response.data);
        /*  dispatch({
          type: actionTypes.LOGIN,
          user: results,
        });*/
        console.log(response.data);
        login(response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/registration" variant="body2">
                  ¿No tienes una cuenta? Regístrese
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
