import { NavLink } from "react-router-dom";
import { CirclePlus, ListChecks, ClipboardList, X } from "lucide-react";

const links = [
  { to: "/add", label: "Add Items", icon: CirclePlus },
  { to: "/list", label: "List Items", icon: ListChecks },
  { to: "/orders", label: "Orders", icon: ClipboardList },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 sm:hidden"
        />
      )}

      <div
        className={`
          fixed sm:static top-0 left-0 h-full sm:h-auto z-40
          w-64 sm:w-[18%] min-h-screen bg-white border-r border-r-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
        `}
      >
        <div className="flex justify-end p-3 sm:hidden">
          <button onClick={onClose}>
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:pt-6 px-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 border rounded-lg py-2.5 px-3 sm:px-4 text-sm
                 transition-colors ${
                   isActive
                     ? "bg-gray-100 border-gray-300 text-gray-900 font-medium"
                     : "border-gray-200 text-gray-700 hover:bg-gray-50"
                 }`
              }
            >
              <Icon size={18} strokeWidth={1.8} />
              <p className="hidden sm:block">{label}</p>
              <p className="sm:hidden">{label}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;