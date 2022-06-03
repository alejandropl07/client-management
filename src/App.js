import "./App.css";
import { StateProvider } from "./StateProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Error from "./components/Error";
import ListClients from "./components/ListClients";
import FormClient from "./components/FormClient";

import store from "./store";
import { Provider } from "react-redux";


function App() {
  return (
    <Router>
      <Provider store={store}>
      {/* <StateProvider> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/error" element={<Error />} />
          <Route exact path="/list" element={<ListClients />} />
          <Route exact path="/createclient" element={<FormClient />} />
        </Routes>
      {/* </StateProvider> */}
      </Provider>
    </Router>
  );
}

export default App;
