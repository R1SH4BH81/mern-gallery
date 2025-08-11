import React, { useState } from "react";
import API from "../api";

export default function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const toggleMode = () => {
    setError("");
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        onAuthSuccess(res.data.user);
      } else {
        await API.post("/auth/register", {
          username: form.username,
          email: form.email,
          password: form.password,
        });
        alert("Registered successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Inline styles
  const containerStyle = {
    maxWidth: 400,
    margin: "auto",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  };
  const inputStyle = {
    width: "100%",
    padding: 8,
    marginBottom: 12,
    boxSizing: "border-box",
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: 14,
  };
  const buttonStyle = {
    width: "100%",
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 4,
    fontSize: 16,
    cursor: "pointer",
  };
  const toggleButtonStyle = {
    color: "blue",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontSize: 14,
    textDecoration: "underline",
  };
  const errorStyle = {
    color: "red",
    marginTop: 10,
  };
  const paragraphStyle = {
    marginTop: 15,
    fontSize: 14,
  };

  return (
    <div style={containerStyle}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            style={inputStyle}
          />
        )}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      {error && <p style={errorStyle}>{error}</p>}
      <p style={paragraphStyle}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={toggleMode} style={toggleButtonStyle}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
