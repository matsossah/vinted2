import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const { productName, price } = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      productName: productName,
      price: price,
    });
    console.log(stripeResponse);

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post("http://localhost:3001/payment", {
      amount: price,
      title: productName,
      stripeToken: stripeToken,
    });
    console.log(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Product : {productName}</div>
      <div>Price : {price}</div>
      <CardElement />
      <input type="submit" />
    </form>
  );
};

export default Payment;
