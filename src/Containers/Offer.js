import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(offer.product_details);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p>{offer.product_name}</p>
      {offer.product_details.map((detail, index) => {
        const key = Object.keys(detail);
        return <p key={index}>{key[0] + ": " + detail[key[0]]}</p>;
      })}
    </div>
  );
};

export default Offer;
