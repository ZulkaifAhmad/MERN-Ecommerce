import { Menu } from "lucide-react";
import assets from "../assets/assets";

const Navbar = ({ setToken, onMenuClick }) => {
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("admin_token");
  };

  return (
    <div className="flex items-center border-b border-b-gray-300 justify-between py-3 px-[4%] bg-white sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger - visible only on mobile */}
        <button onClick={onMenuClick} className="sm:hidden p-1 text-gray-700">
          <Menu size={24} />
        </button>

        <div>
          <img src={assets.logo} className="w-32 h-auto object-cover" alt="Admin Logo" />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-slate-700 hover:bg-slate-800 transition-colors text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
