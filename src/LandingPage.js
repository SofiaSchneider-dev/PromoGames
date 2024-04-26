import React, { useState } from "react";
import "./index.css";

const LandingPage = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9tnyDAcRKXRiecuY5I4XdQS2HhQ4WUbE"
        : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9tnyDAcRKXRiecuY5I4XdQS2HhQ4WUbE";

      const data = JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      const text = await response.text();
      const json = JSON.parse(text);

      if (json.error) {
        setError(json.error.message);
        setSuccess("");
      } else {
        setError("");
        if (isSignUp) {
          setSuccess("Sign-up successful!");
        } else {
          setSuccess("Login successful!");
          handleLogin();
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  const toggleSignUpMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setSuccess("");
  };

  return (
    <div className="landing-page">
      <div className="landing-page-container">
        <h1>PromoGames Reportes</h1>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">
            {isSignUp ? "Regístrate" : "Inicia Sesión"}
          </button>
        </form>
        <button onClick={toggleSignUpMode}>
          {isSignUp
            ? "Ya tienes una cuenta? Inicia sesión"
            : "Aún no tienes una cuenta? Regístrate"}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
