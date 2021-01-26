import { Link } from "react-router-dom";
import cover from "../assets/cover.jpeg";

const Home = (props) => {
  const { isLoading, data } = props;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
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
