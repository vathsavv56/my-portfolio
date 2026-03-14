import { NavLink } from "react-router";
import { cn } from "../cn";

import { GiHeraldicSun } from "react-icons/gi";

const navLinks = [
  { to: "/", name: "Home" },
  { to: "/resume", name: "Resume" },
  { to: "/blogs", name: "Blogs" },
  {to:"/analytics", name:"Analytics"}
];

const Navbar = () => {
  return (
    <header>
      <nav className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          {navLinks.map((item, index) => (
            <NavLink
              to={item.to}
              key={index}
              className={({ isActive }) =>
                cn("text-sm text-gray-500", {
                  "text-gray-50 font-medium": isActive,
                })
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center text-amber-500 text-5xl drop-shadow-md transition-transform duration-500  cursor-pointer ">
            <GiHeraldicSun />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
