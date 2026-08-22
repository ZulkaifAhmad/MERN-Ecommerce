import { Menu } from "lucide-react";
import assets from "../assets/assets";

const Navbar = ({ setToken, onMenuClick }) => {
  return (
    <div className="flex items-center border-b border-b-gray-300 justify-between py-3 px-[4%] bg-white ">
      <div className="flex items-center gap-3">
        {/* Hamburger - visible only on mobile */}
        <button onClick={onMenuClick} className="sm:hidden p-1 text-gray-700">
          <Menu size={24} />
        </button>

        <div>
          <img src={assets.logo} className="w-full h-15 object-cover" alt="" />
        </div>
      </div>

      <button
        onClick={() => setToken("")}
        className="bg-slate-600 hover:bg-slate-700 transition-colors text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
