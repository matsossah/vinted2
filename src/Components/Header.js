import { Link } from "react-router-dom";

const Header = (props) => {
  const {
    logo,
    token,
    handleLogout,
    title,
    handleTitle,
    priceMin,
    handlePriceMin,
    priceMax,
    handlePriceMax,
    priceOrg,
    handlePriceOrg,
    limit,
    handleLimit,
    skip,
    handleSkip,
  } = props;
  return (
    <header>
      <div>
        <img src={logo} alt="logo" />
      </div>
      {token ? (
        <div>
          <input
            type="text"
            value={title}
            placeHolder="Search..."
            onChange={(event) => {
              handleTitle(event);
            }}
          />
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={title}
            placeHolder="Search..."
            onChange={(event) => {
              handleTitle(event);
            }}
          />
          <p>Décroissant</p>
          <input
            type="checkbox"
            checked={priceOrg === "price-desc" ? true : false}
            onChange={() => {
              priceOrg !== "price-desc"
                ? handlePriceOrg("price-desc")
                : handlePriceOrg("");
            }}
          />
          <p>Croissant</p>
          <input
            type="checkbox"
            checked={priceOrg === "price-asc" ? true : false}
            onChange={() => {
              priceOrg !== "price-asc"
                ? handlePriceOrg("price-asc")
                : handlePriceOrg("");
            }}
          />
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
