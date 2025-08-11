// src/components/AuthForm.jsx
import React, { useState } from "react";
import API from "../api"; // axios instance
import "./Authform.css";

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

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSubmit}>
        <span className="title">{isLogin ? "Login" : "Sign up"}</span>
        <span className="subtitle">
          {isLogin
            ? "Enter your credentials to continue."
            : "Create a free account with your email."}
        </span>

        <div className="form-container">
          {!isLogin && (
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Full Name"
              value={form.username}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{isLogin ? "Login" : "Sign up"}</button>
      </form>

      {error && (
        <p style={{ color: "red", margin: "10px 0", textAlign: "center" }}>
          {error}
        </p>
      )}

      <div className="form-section">
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a href="#!" onClick={toggleMode}>
            {isLogin ? "Sign up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}
