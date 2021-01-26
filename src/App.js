import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import logo from "./assets/vinted-logo.png";
import axios from "axios";

import Home from "./Containers/Home.js";
import Signup from "./Containers/Signup.js";
import Login from "./Containers/Login.js";
import Offer from "./Containers/Offer.js";
import Header from "./Components/Header.js";

const App = () => {
  const [token, setToken] = useState();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const handleLogout = () => {
    Cookies.remove("userToken");
    setToken("");
  };

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Header logo={logo} token={token} handleLogout={handleLogout} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/signup">
          <Signup setToken={setToken} />
        </Route>
        <Route path="/">
          <Home token={token} data={data} isLoading={isLoading} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
