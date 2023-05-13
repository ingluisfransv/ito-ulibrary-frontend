import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import axios from "axios";
import { UserContext } from "../context/UserContext";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const appContext = useContext(UserContext); // get the context object

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter an email and password");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/endpoint/users/login`, { email, password })
      .then((response) => {
        console.log(response);
        if(response.data == false){
          setErrorMessage("Invalid email or password");
          console.log(response);
        }else{
          appContext.setUser(response.data); // set the user object in the context
          navigate("/Home");
        }
      })
      .catch((error) => {
        setErrorMessage("Invalid email or password");
        console.log(error);
      });
  };
  
  

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log In</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
