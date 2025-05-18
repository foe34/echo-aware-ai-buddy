
import { Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Signup", to: "/signup" },
  { label: "Subscription", to: "/subscription" },
];

export default function AppNavbar() {
  const location = useLocation();
  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-[#1A2440] shadow-sm">
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 text-white" />
        <span className="text-xl font-semibold text-white select-none">Voice Assistant</span>
      </div>
      <div className="flex items-center space-x-4">
        {navLinks.map((nav) => (
          <Link
            key={nav.to}
            to={nav.to}
            className={`text-white/80 hover:text-white px-2 py-1 rounded-md ${
              (location.pathname === nav.to || (nav.to === "/" && location.pathname === "")) && "bg-[#222d4e]"
            }`}
          >
            {nav.label}
          </Link>
        ))}
        <Search className="w-5 h-5 text-white" />
      </div>
    </nav>
  );
}
