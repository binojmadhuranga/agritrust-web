'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaLeaf, FaUser, FaSignInAlt } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <FaLeaf className="text-2xl" />
            <span className="font-bold text-xl">AgriTrust</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="hover:text-green-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/dashboards/farmer" 
              className="hover:text-green-200 transition-colors font-medium"
            >
              Farmer
            </Link>
            <Link 
              href="/dashboards/vendor" 
              className="hover:text-green-200 transition-colors font-medium"
            >
              Vendor
            </Link>
            <Link 
              href="/dashboards/user" 
              className="hover:text-green-200 transition-colors font-medium"
            >
              User
            </Link>
            <Link 
              href="/dashboards/admin" 
              className="hover:text-green-200 transition-colors font-medium"
            >
              Admin
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/profile" 
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-700 transition-colors"
              aria-label="Profile"
            >
              <FaUser className="text-xl" />
            </Link>
            <Link 
              href="/login" 
              className="flex items-center space-x-2 px-6 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors font-medium"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none hover:text-green-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/dashboards/farmer" 
              className="block px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Farmer Dashboard
            </Link>
            <Link 
              href="/dashboards/vendor" 
              className="block px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vendor Dashboard
            </Link>
            <Link 
              href="/dashboards/user" 
              className="block px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              User Dashboard
            </Link>
            <Link 
              href="/dashboards/admin" 
              className="block px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
            <div className="border-t border-green-500 my-2 pt-2">
              <Link 
                href="/profile" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
              <Link 
                href="/login" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
