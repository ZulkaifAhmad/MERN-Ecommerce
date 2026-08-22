import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Add from "./Pages/Add.jsx";
import List from "./Pages/List.jsx";
import Orders from "./Pages/Orders.jsx";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="w-full sm:w-[82%] mx-auto sm:ml-0 sm:mr-0 sm:pl-8 pt-8 px-4 sm:px-0 text-gray-700">
          <Routes>
            <Route path="/" element={<Navigate to="/list" />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;