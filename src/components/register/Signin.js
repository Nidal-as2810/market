import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import { create } from "../../api/crud";
import { getTempOrder } from "../../api/orderApi";
import useAuth from "../../context/useAuth";
import useTempOrder from "../../context/useTempOrder";

function Signin() {
  const { setAuth } = useAuth();
  const { setTempOrder } = useTempOrder();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageٍStyle, setMessageStyle] = useState({ color: "green" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!username || !password) {
      setMessage("All Fields Are REQUIRED!");
      setMessageStyle({ color: "red" });
      return;
    }

    const data = {
      username,
      password,
    };

    const response = await create("/auth", data);
    if (response.status === 200) {
      setAuth({ token: response.token, username, roles: response.roles });
      const tempResponse = await getTempOrder(username, response.token);
      if (tempResponse.status === 200) {
        console.log(tempResponse);
        setTempOrder(tempResponse.data);
      }
      navigate("/", { replace: true });
    } else {
      setMessage(response.response.statusText);
      setMessageStyle({ color: "red" });
      return;
    }
  };
  return (
    <div className={classes.signup}>
      <form className={`${classes.form} bg-shadow`} onSubmit={handleSubmit}>
        <h2 className={`${classes.title} upper`}>sign in</h2>
        <div className={classes.formItem}>
          <label htmlFor="username" className={`${classes.label} capitalize`}>
            username
          </label>
          <input
            type="text"
            id="username"
            className={classes.input}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={classes.formItem}>
          <label htmlFor="password" className={`${classes.label} capitalize`}>
            password
          </label>
          <input
            type="password"
            id="password"
            className={classes.input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className={classes.formItem}>
          <button className={classes.button}>submit</button>
        </div>
        <p className={classes.message} style={messageٍStyle}>
          {message}
        </p>
      </form>
    </div>
  );
}

export default Signin;
