import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./signlog.css"; // Link your CSS here

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const API_URL = import.meta.env.VITE_API_URL;
const url = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;


    try {
      const res = await axios.post(url, formData);
      const user = res.data.user;

      setMessage(isLogin ? "Login successful!" : "Signup successful! You can now log in.");
      setError("");

      if (isLogin) {
        login({
          name: user.name,
          role: user.role,
          token: res.data.token,
        });

        navigate(user.role === "admin" ? "/admin/dashboard" : "/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-toggle">
          <button className={`auth-toggle-btn ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={`auth-toggle-btn ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="auth-input"
              required
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="auth-submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
