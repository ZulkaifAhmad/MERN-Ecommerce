import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
import Add from "./Pages/Add.jsx";
import List from "./Pages/List.jsx";
import Orders from "./Pages/Orders.jsx";

const App = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [token, setToken] = useState(
    localStorage.getItem("admin_token") || ""
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("admin_token", token);
    } else {
      localStorage.removeItem("admin_token");
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex w-full">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div className="w-full sm:w-[82%] mx-auto sm:ml-0 sm:mr-0 sm:pl-8 pt-8 px-4 sm:px-6 text-gray-700">
              <Routes>
                <Route path="/" element={<Navigate to="/list" />} />
                <Route
                  path="/add"
                  element={<Add token={token} backendUrl={backendUrl} />}
                />
                <Route
                  path="/list"
                  element={<List token={token} backendUrl={backendUrl} />}
                />
                <Route
                  path="/orders"
                  element={<Orders token={token} backendUrl={backendUrl} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;