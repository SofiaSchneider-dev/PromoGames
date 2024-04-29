import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import MainApp from "./MainApp";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <MainApp handleLogout={handleLogout} />
      ) : (
        <LandingPage handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

