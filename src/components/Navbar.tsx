import { NavLink } from "react-router";
import { cn } from "../cn";
import { useState } from "react";
import { GiHeraldicSun, GiMoon } from "react-icons/gi";

const navLinks = [
  { to: "/", name: "Home" },
  { to: "/resume", name: "Resume" },
  { to: "/blogs", name: "Blogs" },
];


const Navbar = () => {
  const [mode, setMode] = useState<boolean>(true);

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
         
          <button
            className="group relative inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colorsfocus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            onClick={() => setMode((p) => !p)}
          >
            <div
              className={`absolute text-2xl transition-[opacity,transform] duration-200 ease-out ${
                mode ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <GiHeraldicSun />
            </div>
            <div
              className={`absolute text-xl transition-[opacity,transform] duration-200 ease-out  ${
                !mode ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <GiMoon />
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
