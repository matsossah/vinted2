import { Link } from "react-router-dom";

const Header = (props) => {
  const { logo, token, handleLogout } = props;
  return (
    <header>
      <div>
        <img src={logo} alt="logo" />
      </div>
      {token ? (
        <div>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <div>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </div>
      )}
      <button>Vendre ses articles</button>
    </header>
  );
};

export default Header;
