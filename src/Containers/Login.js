import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = (props) => {
  const { setToken } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    let value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    let value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
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
        <input value={email} placeholder="email" onChange={handleEmailChange} />
        <input
          value={password}
          placeholder="password"
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
