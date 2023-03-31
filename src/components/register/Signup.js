import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import { create } from "../../api/crud";

function Signup() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageٍStyle, setMessageStyle] = useState({ color: "green" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [match, setMatch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!username || !password || !match) {
      setMessage("All Fields Are REQUIRED!");
      setMessageStyle({ color: "red" });
      return;
    }

    if (match !== password) {
      setMessage("Password and cofirmation don't match!");
      setMessageStyle({ color: "red" });
      return;
    }

    const data = {
      username,
      password,
    };

    const response = await create("/register", data);
    if (response.status === 201) {
      navigate("/", { replace: true });
    } else {
      setMessage(response.response.data.message);
      setMessageStyle({ color: "red" });
    }
  };
  return (
    <div className={classes.signup}>
      <form className={`${classes.form} bg-shadow`} onSubmit={handleSubmit}>
        <h2 className={`${classes.title} upper`}>sign up</h2>
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
          <label htmlFor="match" className={`${classes.label} capitalize`}>
            confirm password
          </label>
          <input
            type="password"
            id="match"
            className={classes.input}
            value={match}
            onChange={(e) => {
              setMatch(e.target.value);
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

export default Signup;
