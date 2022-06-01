import React, { useContext, useEffect, useState } from "react";
import clientAxios from "../config/axios";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

function List() {
  //const [{ clients },   dispatch] = useStateValue();
  const [results, setResults] = useState();
  const getClients = async () => {
    await clientAxios
      .get("api/Authenticate/register", { username: "string", email: "user@example.com", password: "Usuario2022*+" })
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


  const register = async () => {
    await clientAxios
      .post("api/Authenticate/register", { username: "string", email: "user@example.com", password: "Usuario2022*+" })
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
   // register();
  }, []);
  return <div>dsfsdfsdfdsfsfdfdfsdf</div>;
}

export default List;
