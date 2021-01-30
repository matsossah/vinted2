import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import logo from "./assets/vinted-logo.png";
import axios from "axios";
import qs from "qs";

import Home from "./Containers/Home.js";
import Signup from "./Containers/Signup.js";
import Login from "./Containers/Login.js";
import Offer from "./Containers/Offer.js";
import Header from "./Components/Header.js";
import { useDebounce } from "use-debounce";

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
  const [debouncedTitle] = useDebounce(title, 1500);
  const [debouncedPriceMin] = useDebounce(priceMin, 1500);
  const [debouncedPriceMax] = useDebounce(priceMax, 1500);

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        title: debouncedTitle,
        priceMin: debouncedPriceMin,
        priceMax: debouncedPriceMax,
        sort: priceOrg,
        limit: limit,
        skip: skip,
      };
      const queryParams = qs.stringify(params);
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?${queryParams}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedTitle, debouncedPriceMin, debouncedPriceMax, priceOrg]);

  const handleLogout = () => {
    Cookies.remove("userToken");
    setToken("");
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceMin = (event) => {
    setPriceMin(event.target.value);
  };

  const handlePriceMax = (event) => {
    setPriceMax(event.target.value);
  };

  const handlePriceOrg = (event) => {
    setPriceOrg(event.target.value);
  };

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleSkip = (event) => {
    setSkip(event.target.value);
  };

  return (
    <Router>
      <Header
        logo={logo}
        token={token}
        title={title}
        priceMin={priceMin}
        priceMax={priceMax}
        priceOrg={priceOrg}
        limit={limit}
        skip={skip}
        handleLogout={handleLogout}
        handleTitle={handleTitle}
        handlePriceMin={handlePriceMin}
        handlePriceMax={handlePriceMax}
        handlePriceOrg={handlePriceOrg}
        handleLimit={handleLimit}
        handleSkip={handleSkip}
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
