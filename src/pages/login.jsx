import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Both fields are required");
      setLoading(false);
      return;
    }

    try {
      // ✅ Fetch all users from DummyJSON (works, no CORS issue)
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      const foundUser = data.users.find(
        (u) => u.username === username && u.password === password
      );
      console.log(foundUser);

      if (!foundUser) {
        throw new Error("Invalid username or password");
      }

      // Check if localStorage is available
      if (typeof Storage !== "undefined") {
        localStorage.setItem("token", "jwt-token");
        localStorage.setItem("user", JSON.stringify(foundUser));
      }
      else {
        console.warn("localStorage is not available");
        // You might want to use a different storage method here
      }

      navigate("/profile");
    }
    catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginBox">
      <div className="loginForm">
        <h2 className="mb-3 mt-5 text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Test credentials helper */}
        <div className="mt-3 mb-4 text-muted small">
          <div><strong>Test credentials:</strong></div>
          <div>Username: emilys</div>
          <div>Password: emilyspass</div>
        </div>
      </div>
    </div>
  );
}

export default Login;