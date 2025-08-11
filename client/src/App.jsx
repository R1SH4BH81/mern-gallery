import React, { useState, useEffect } from "react";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simple auth persistence via token existence
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, decode token or fetch user info here
      setUser({}); // dummy user for demo
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) {
    return <LoginSignup onLogin={handleLogin} />;
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{ position: "fixed", top: 10, right: 10 }}
      >
        Logout
      </button>
      <Home />
    </div>
  );
}
