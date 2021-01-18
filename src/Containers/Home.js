import { Link } from "react-router-dom";
import logo from "../assets/vinted-logo.png";
import cover from "../assets/cover.jpeg";

const Home = () => {
  return (
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
      <Link to="/offer"> Aller sur la page LVQM Offer</Link>
    </div>
  );
};

export default Home;
