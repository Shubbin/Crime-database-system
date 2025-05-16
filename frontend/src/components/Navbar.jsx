import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../source/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">
            Crimewatch
          </Link>
          <div className="text-white">Loading...</div>
        </div>
      </nav>
    );
  }

  const isLoggedIn = !!user;
  const role = user?.role;

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Crimewatch
        </Link>

        <div className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-accent">
              Home
            </Link>
          </li>

          <li>
            <Link
              to={isLoggedIn ? "/view-criminals" : "/about"}
              className="text-white hover:text-accent"
            >
              {isLoggedIn ? "ViewCriminals" : "About"}
            </Link>
          </li>

          <li>
            <Link to="/contact" className="text-white hover:text-accent">
              Contact
            </Link>
          </li>

          <li>
            {isLoggedIn ? (
              role === "user" ? (
                <Link to="/profile" className="text-white hover:text-accent">
                  Profile
                </Link>
              ) : role === "police" || role === "admin" ? (
                <Link to="/dashboard" className="text-white hover:text-accent">
                  Dashboard
                </Link>
              ) : null
            ) : (
              <Link to="/login" className="text-white hover:text-accent">
                Login
              </Link>
            )}
          </li>

          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-accent bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link to="/signup" className="text-white hover:text-accent">
                Signup
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu */}
        <ul
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute bg-primary w-full left-0 top-16 space-y-4 px-6 py-4`}
        >
          <li>
            <Link
              to="/"
              className="text-white hover:text-accent"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to={isLoggedIn ? "/view-criminals" : "/about"}
              className="text-white hover:text-accent"
              onClick={toggleMenu}
            >
              {isLoggedIn ? "ViewCriminals" : "About"}
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="text-white hover:text-accent"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>

          <li>
            {isLoggedIn ? (
              role === "user" ? (
                <Link
                  to="/profile"
                  className="text-white hover:text-accent"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
              ) : role === "police" || role === "admin" ? (
                <Link
                  to="/dashboard"
                  className="text-white hover:text-accent"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              ) : null
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-accent"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </li>

          <li>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-white hover:text-accent bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signup"
                className="text-white hover:text-accent"
                onClick={toggleMenu}
              >
                Signup
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
