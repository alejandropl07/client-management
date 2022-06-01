import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import clientAxios from "../config/axios";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

import { useNavigate } from "react-router-dom";
import { getClientsSuccess } from "../actions/clientsAction";
import { useDispatch } from "react-redux";

function List() {
  //const [{ clients },   dispatch] = useStateValue();
  const [results, setResults] = useState();
  const { token } = useSelector((state) => state.user.user);
  const { userid } = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getClientsAction = (clients) => dispatch(getClientsSuccess(clients));

  const getInterest = async () => {
    await clientAxios
      .get("api/Intereses/Listado", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setResults(response.data);
        /*  dispatch({
          type: actionTypes.GET_CLIENTS,
          item: results,
        });*/
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClients = async () => {
      console.log(userid);
    await clientAxios
      .post("api/Cliente/Listado",{usuarioid:   userid}, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

  const register = async () => {
    await clientAxios
      .post("api/Authenticate/register", {
        username: "string",
        email: "user@example.com",
        password: "Usuario2022*+",
      })
      .then((response) => {
        setResults(response);
        /*  dispatch({
          type: actionTypes.GET_CLIENTS,
          item: results,
        });*/
        console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClients();
  }, []);
  return <div>dsfsdfsdfdsfsfdfdfsdf</div>;
}

export default List;
