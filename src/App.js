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
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);
  const [priceOrg, setPriceOrg] = useState("");
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);

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
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${title}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${priceOrg}?limit=${limit}&skip=${skip}`
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
      <Header
        logo={logo}
        token={token}
        handleLogout={handleLogout}
        setTitle={setTitle}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
        setPriceOrg={setPriceOrg}
        setLimit={setLimit}
        setSkip={setSkip}
      />
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
        <Route
          path="/"
          children={<Home token={token} data={data} isLoading={isLoading} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
