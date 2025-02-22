import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { TimerIcon } from 'lucide-react'; // Using TimerIcon as in the second snippet

// Mock authentication state (replace with actual auth later)
const isAuthenticated = false;
const userProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // With wouter, location is a string, so compare directly:
  const isActive = (path) => location === path;

  // Updated navigation fields from the second snippet
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Create', path: '/create' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <TimerIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Time Capsule
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Links */}
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-[6px] text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Create Capsule Button */}
            <Link
              href="/create"
              className="ml-4 px-4 py-2 rounded-sm bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Capsule
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          /* Handle logout */
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/auth"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/create"
              className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => setIsOpen(false)}
            >
              Create Capsule
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
