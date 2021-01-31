import { Link, useHistory } from "react-router-dom";
import cover from "../assets/cover.jpeg";

const Home = (props) => {
  const { isLoading, data } = props;
  let history = useHistory();

  const handleBuy = (productName, price) => {
    console.log("Buy");
    history.push("/Payment", {
      productName: productName,
      price: price,
    });
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      {data.offers.map((offer, index) => {
        return (
          <div key={index}>
            <Link to={`/offer/${offer._id}`} key={offer._id}>
              <p>
                {offer.product_name} - {offer.product_price}
              </p>
            </Link>
            <button
              onClick={() => handleBuy(offer.product_name, offer.product_price)}
            >
              Buy
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
