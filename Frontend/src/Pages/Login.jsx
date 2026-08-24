import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { myContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

function Login() {
  const [currentState, setCurrentState] = useState("Login"); // 'Login' | 'Sign Up'
  const { token, setToken, setUserData, backendUrl, navigate } =
    useContext(myContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await fetch(`${backendUrl}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setToken(data.token);
          setUserData(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", JSON.stringify(data.user));
          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error(data.message || "Signup failed");
        }
      } else {
        const response = await fetch(`${backendUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setToken(data.token);
          setUserData(data.userData);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", JSON.stringify(data.userData));
          toast.success("Welcome back!");
          navigate("/");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm flex flex-col gap-5"
      >
        <div className="mb-2">
          <Title
            title1={currentState === "Login" ? "Log" : "Sign"}
            title2={currentState === "Login" ? "In" : "Up"}
          />
          <p className="text-gray-500 text-sm mt-3">
            {currentState === "Login"
              ? "Welcome back! Please enter your details."
              : "Create an account to get started."}
          </p>
        </div>

        {currentState === "Sign Up" && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Full name (min 3 chars)"
            required
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600 transition"
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email address"
          required
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600 transition"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          placeholder="Password (min 5 chars)"
          required
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-slate-600 transition"
        />

        <div className="flex justify-between text-sm text-gray-500 -mt-1">
          {currentState === "Login" ? (
            <>
              <p className="cursor-pointer hover:text-slate-700 transition">
                Forgot your password?
              </p>
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer hover:text-slate-700 transition font-medium text-black"
              >
                Create account
              </p>
            </>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:text-slate-700 transition ml-auto font-medium text-black"
            >
              Already have an account? Log in
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white tracking-widest text-sm py-4 mt-2 hover:bg-slate-800 disabled:opacity-50 transition cursor-pointer"
        >
          {loading
            ? "PROCESSING..."
            : currentState === "Login"
            ? "SIGN IN"
            : "CREATE ACCOUNT"}
        </button>
      </form>
    </div>
  );
}

export default Login;