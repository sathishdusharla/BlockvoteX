import { Link, useLocation } from 'react-router-dom';
import { Lock, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation(); // Get the current location
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility

  return (
    <nav className="fixed w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-blue-600/20 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Lock className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              BlockVotex
            </span>
          </Link>

          {/* Hamburger Menu Icon */}
          <button
            className="md:hidden flex items-center text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Menu Items */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } absolute top-16 left-0 w-full bg-slate-900 md:bg-transparent md:relative md:top-0 md:flex md:items-center md:space-x-8`}
          >
            <NavLink to="/" text="Home" />
            <NavLink to="/about" text="About" />
            <NavLink to="/contact" text="Contact" />
            <NavLink to="/help" text="Help" />

            {/* Conditionally render Admin button only on the homepage */}
            {location.pathname === '/' && (
              <Link
                to="/admin-login"
                className="block md:inline bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, text }: { to: string; text: string }) => (
  <Link
    to={to}
    className="block md:inline-block text-gray-300 hover:text-blue-500 transition-colors duration-200 px-4 py-2 md:py-0"
  >
    {text}
  </Link>
);

export default Navbar;
