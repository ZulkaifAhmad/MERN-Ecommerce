import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("admin_token", data.token);
        toast.success("Welcome, Admin!");
      } else {
        toast.error(data.message || "Invalid admin credentials");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error("Network error during admin login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg px-8 py-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Admin Panel
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to manage your e-commerce platform
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-slate-800 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2.5 outline-none focus:border-slate-800 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-medium py-3 rounded mt-2 hover:bg-slate-800 transition disabled:opacity-50 text-sm cursor-pointer"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN AS ADMIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
