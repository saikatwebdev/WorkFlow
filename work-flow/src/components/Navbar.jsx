import React from "react";
import { Menu, X, Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ onOpenModal, isMenuOpen, toggleMenu }) => {
  const handleNavClick = (section) => {
    // Close mobile menu when clicking a nav item
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className="mx-4 sm:mx-6 lg:mx-8 rounded-xl shadow-lg shadow-gray-300/50 bg-white/90 backdrop-blur-md border border-gray-200/50 sticky top-6 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Workflow
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {["features", "pricing", "testimonials"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => handleNavClick(section)}
                  className="group relative text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
              ))}
              {/* Theme Toggle */}
              <ThemeToggle isDark={false} toggleTheme={() => {}} />

              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform"
                onClick={onOpenModal}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 rounded-b-xl px-4 pt-4 pb-6 animate-fadeIn">
          <div className="space-y-1">
            {["features", "pricing", "testimonials"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => handleNavClick(section)}
                className="block group relative px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute left-3 -bottom-0.5 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-6 rounded-full"></span>
              </a>
            ))}
          </div>
          <button
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={(e) => {
              onOpenModal();
              toggleMenu();
            }}
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
