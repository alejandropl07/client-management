import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useDispatch } from "react-redux";
import { displayList, displayWelcome } from "../actions/displayAction";

function ListItems() {
  const dispatch = useDispatch();

  const displayWelcomeAction = () => dispatch(displayWelcome());
  const displayListAction = () => dispatch(displayList());

  const showListClient = () => {
    displayListAction();
  };

  const showWelcome = () => {
    displayWelcomeAction();
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={showWelcome}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      <ListItemButton onClick={showListClient}>
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Consulta clientes" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems;
