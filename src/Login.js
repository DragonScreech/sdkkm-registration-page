// pages/SimpleLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router"

const SimpleLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 Replace with your desired credentials
    const correctUsername = process.env.REACT_APP_ADMIN_USERNAME || "admin";
    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/report");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-md border border-white/20 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded bg-black/40 border border-red-500 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-black/40 border border-red-500 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 transition text-white p-3 rounded font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SimpleLogin;
