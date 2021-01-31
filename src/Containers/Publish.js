import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const Publish = (props) => {
  const { token } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState(null);
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState("");

  const handleTitle = (event) => {
    let value = event.target.value;
    setTitle(value);
  };

  const handleDescription = (event) => {
    let value = event.target.value;
    setDescription(value);
  };

  const handlePrice = (event) => {
    let value = event.target.value;
    setPrice(value);
  };

  const handleCondition = (event) => {
    let value = event.target.value;
    setCondition(value);
  };

  const handleCity = (event) => {
    let value = event.target.value;
    setCity(value);
  };

  const handleBrand = (event) => {
    let value = event.target.value;
    setBrand(value);
  };

  const handleSize = (event) => {
    let value = event.target.value;
    setSize(value);
  };

  const handleColor = (event) => {
    let value = event.target.value;
    setColor(value);
  };

  const handlePicture = (event) => {
    let value = event.target.files[0];
    setPicture(value);
  };

  const publishOffer = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <form onSubmit={publishOffer}>
      <div>Publish</div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={handleTitle}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={handleDescription}
      />
      <input
        type="number"
        placeholder="price"
        value={price ? price : ""}
        onChange={handlePrice}
      />
      <input
        type="text"
        placeholder="condition"
        value={condition}
        onChange={handleCondition}
      />
      <input
        type="text"
        placeholder="city"
        value={city}
        onChange={handleCity}
      />
      <input
        type="text"
        placeholder="brand"
        value={brand}
        onChange={handleBrand}
      />
      <input
        type="number"
        placeholder="size"
        value={size ? size : ""}
        onChange={handleSize}
      />
      <input
        type="text"
        placeholder="color"
        value={color}
        onChange={handleColor}
      />
      <input type="file" onChange={handlePicture} />
      <input type="submit" value="Submit" />
    </form>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
