import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://uls-backend.onrender.com/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src="../../public/assets/logo/logo.webp"
          alt="Universal Logging System"
          style={styles.logo}
        />
        <h2 style={styles.title}>Enter To Log ...</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

// Internal CSS styles
const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,rgb(16, 68, 90),rgb(76, 146, 170),rgb(93, 172, 199), #2C5364)", // Unique deep blue gradient    margin: 0,
    padding: 0,
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
    width: "400px",
    maxWidth: "90%",
    textAlign: "center",
    boxSizing: "border-box",
    animation: "fadeIn 0.5s ease-in-out",
  },
  logo: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    marginBottom: "15px",
  },
  title: {
    fontSize: "22px",
    color: "#333",
    fontWeight: "600",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#4A90E2",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  buttonDisabled: {
    background: "#999",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

// Add hover effect for button
styles.button[":hover"] = {
  background: "#357ABD",
};

export default Login;
