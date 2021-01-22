import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cover from "../assets/cover.jpeg";
import logo from "../assets/vinted-logo.png";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

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

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <header>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vendre ses articles</button>
        </div>
      </header>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      {data.offers.map((offer, index) => {
        return (
          <Link to={`/offer/${offer._id}`} key={offer._id}>
            <p>{offer.product_name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
