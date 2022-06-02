import React from "react";
import React, {useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";

import {useDispatch, useSelector}    from    "react-redux";

function UpdateClient() {
  const nombreRef = useRef("");
  const apellidosRef = useRef("");
  const identificacionRef = useRef("");
  const telefonoCelularRef = useRef("");
  const otroTelefonoRef = useRef("");
  const direccionRef = useRef("");
  const fNacimientoRef = useRef("");
  const fAfiliacionRef = useRef("");
  const sexoRef = useRef("");
  const resenaPersonalRef = useRef("");

  const interestSelectRef = useRef("");

  const { userid } = useSelector((state) => state.user.user);
  const { interest } = useSelector((state) => state.interest);
  const { token } = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getInterestAction = (interest) =>
    dispatch(getInterestSuccess(interest));
  const updateClientAction = () => dispatch(updateClientAction());

  const {client} = useSelector((state) =>  state.clients); 

    const   submitEditarCliente    =  async (event)   =>  {
        e.preventDefault();
        await clientAxios
      .post(
        "/api/Cliente/Actualizar",
        {
          nombre:nombreRef,
          apellidos:apellidosRef,
          identificacion:identificacionRef,
          telefonoCelular:telefonoCelularRef,
          otroTelefono:otroTelefonoRef,
          direccion:direccionRef,
          fNacimiento:fNacimientoRef,
          fAfiliacion:fAfiliacionRef,
          sexo:sexoRef,
          resenaPersonal:resenaPersonalRef,
          interesFK: interestSelectRef,
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
        console.log(error);
      });
    }

  return <div></div>;
}

export default UpdateClient;
