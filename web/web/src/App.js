import React, { useState } from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:80/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const token = await response.text();
        setJwtToken(token);
        setIsSubmitted(true);
      } else {
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;
    authenticateUser(uname.value, pass.value);
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isSubmitted ? (
          <Dashboard jwtToken={jwtToken} />
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;