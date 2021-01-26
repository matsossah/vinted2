import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = (props) => {
  const { setToken } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleUsernameChange = (event) => {
    let value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    let value = event.target.value;
    setEmail(value);
  };

  const handlePhoneChange = (event) => {
    let value = event.target.value;
    setPhone(value);
  };

  const handlePasswordChange = (event) => {
    let value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          phone: phone,
          password: password,
        }
      );
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 200 });
        setToken(response.data.token);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          placeholder="username"
          onChange={handleUsernameChange}
        />
        <input value={email} placeholder="email" onChange={handleEmailChange} />
        <input value={phone} placeholder="phone" onChange={handlePhoneChange} />
        <input
          value={password}
          placeholder="password"
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Signup;
