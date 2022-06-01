import "./App.css";
import { StateProvider } from "./StateProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <StateProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/error" element={<Error />} />
        </Routes>
      </StateProvider>
    </Router>
  );
}

export default App;
