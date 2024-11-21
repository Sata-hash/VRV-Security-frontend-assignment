import { NavLink } from "react-router-dom";
import { MenuItems } from "../types";

const Sidebar = () => {
  const menuItems: MenuItems[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/" },
    { id: "users", label: "Users", icon: "👥", path: "/users" },
    { id: "roles", label: "Roles", icon: "🔑", path: "/roles" },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4">
        <span className="text-2xl font-semibold">Admin Panel</span>
      </div>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 w-full text-left ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <span className="flex items-center">
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
