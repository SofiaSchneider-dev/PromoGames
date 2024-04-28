import React, { useState } from "react";
import LandingPage from "./LandingPage";
import MainApp from "./MainApp";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
