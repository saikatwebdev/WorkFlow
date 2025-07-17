import React from 'react';
import PropTypes from 'prop-types';
import { Search, Moon, Calendar, Bell, Mail, Menu, ChevronDown } from 'lucide-react';

const Header = ({ setSidebarOpen, user }) => {
  return (
    <header className="bg-white shadow-sm px-4 lg:px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Left Side: Menu Toggle & Search */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Type to search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-64 transition-all"
            />
          </div>
        </div>
        
        {/* Right Side: Actions & User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          <div className="flex items-center space-x-3 cursor-pointer p-1 rounded-lg hover:bg-gray-100">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-medium">{user.initial}</span>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500">{user.title}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    initial: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;