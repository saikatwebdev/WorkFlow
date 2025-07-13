import React from "react";
import { Menu, X, Zap } from "lucide-react";

const Navbar = ({ onOpenModal, isMenuOpen, toggleMenu }) => {
  return (
    <nav className="mx-90 rounded-xl shadow-md shadow-gray-300 bg-white/80 backdrop-blur-md border border-gray-200 sticky top-6 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Workflow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["features", "pricing", "testimonials"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="group relative text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
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
              className="text-gray-900 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 rounded-b-xl px-4 pt-4 pb-6">
          {["features", "pricing", "testimonials"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="block group relative px-3 py-2 text-base font-medium text-gray-900 hover:text-purple-600 transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button
            className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={onOpenModal}
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
