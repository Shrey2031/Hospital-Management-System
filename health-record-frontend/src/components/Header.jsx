import { Link } from 'react-router-dom';
import logo from '../images/welltrack logo.png';
// import UserLogin from '../pages/Login/UserLogin';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function HealthRecordHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <a
            href="/"
            className="flex items-center text-sky-700 font-extrabold text-2xl select-none"
            aria-label="Welltrack Home"
          >
            <img src={logo} alt="welltracklogo" className="h-10 w-10 mr-2 object-contain" />
            WELLTRACK
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#home"
              className="text-sky-700 hover:text-sky-500 font-semibold px-3 py-2 rounded-md transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sky-700 hover:text-sky-500 font-semibold px-3 py-2 rounded-md transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sky-700 hover:text-sky-500 font-semibold px-3 py-2 rounded-md transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              type="button"
              className="bg-white border border-sky-700 text-sky-700 hover:bg-sky-50 focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 font-semibold rounded-md px-4 py-2 transition"
              onClick={() => navigate('/signup')} // Navigate to Sign Up page
            >
              Sign Up
            </button>
            <button
              type="button"
              className="bg-sky-700 text-white hover:bg-sky-800 focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 font-semibold rounded-md px-4 py-2 transition"
              onClick={() => navigate('/login')} // Navigate to Login page
            >
              Log In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            type="button"
            className="inline-flex items-center justify-center md:hidden text-sky-700 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-400"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-blue-100"
          role="menu"
          aria-label="Mobile menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="block px-3 py-2 rounded-md text-base font-semibold text-sky-700 hover:bg-sky-50"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-base font-semibold text-sky-700 hover:bg-sky-50"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-semibold text-sky-700 hover:bg-sky-50"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="pt-3 border-t border-blue-100 flex flex-col space-y-2 px-3">
              <button
                type="button"
                className="w-full bg-white border border-sky-700 text-sky-700 hover:bg-sky-50 rounded-md px-4 py-2 font-semibold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/signup'); // Navigate to Sign Up page
                }}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="w-full bg-sky-700 text-white hover:bg-sky-800 rounded-md px-4 py-2 font-semibold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login'); // Navigate to Login page
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
