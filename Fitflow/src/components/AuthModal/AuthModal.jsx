import { useState } from "react";
import "./AuthModal.css";

function AuthModal({ isOpen, onClose, onLogin }) {
    // State for form inputs and error handling
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (mode === "register") {
        // --- REGISTER ---
        // Local registration endpoint
        const res = await fetch("http://127.0.0.1:5555/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Registration failed");
          return;
        }

        // Auto-login after registration
        const loginRes = await fetch("http://127.0.0.1:5555/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const loginData = await loginRes.json();

        if (!loginRes.ok) {
          setError(loginData.error || "Auto-login failed");
          return;
        }

        localStorage.setItem("token", loginData.token);
        onLogin(loginData.user);
        onClose();
        return;
      }

      // --- LOGIN ---
      // Local login endpoint
      const res = await fetch("http://127.0.0.1:5555/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      onLogin(data.user);
      onClose();

    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          {mode === "register" && (
            <>
              <label>Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-text">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setMode("register")}>Register</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
