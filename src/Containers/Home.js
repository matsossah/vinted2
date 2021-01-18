import { Link } from "react-router-dom";
import logo from "../assets/vinted-logo.png";

const Home = () => {
  return (
    <div>
      <p>LVQM HOME</p>
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
      <Link to="/offer"> Aller sur la page LVQM Offer</Link>
    </div>
  );
};

export default Home;
