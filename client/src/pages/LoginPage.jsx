import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      });

      const data = await response.json();
      if (response.ok) {
        setError("");
        localStorage.setItem('token', data.token);
        navigate("/admin");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword, name: 'Admin' })
      });

      const data = await response.json();
      if (response.ok) {
        setError("");
        alert("Registration successful!");
        setIsRegistering(false);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-purple-800 to-gray-500 flex items-center justify-center p-4">
      <div className="bg-white/2  rounded-2xl shadow-xl p-8 border border-white/20 w-full max-w-md">
        <h2 className="text-2xl font-bold  text-center text-white">Admin Login</h2>
        {error && <div className="text-red-300 mb-4">{error}</div>}
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email : admin@gmail.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          {isRegistering ? "Switch to Login" : "Don't have an account? Register"}
        </button>
        <button
          onClick={() => navigate('/rider-login')}
          className="mt-4 w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200"
        >
          Are you a rider?
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
