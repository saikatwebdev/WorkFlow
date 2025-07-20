import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import UserDropdown from "../UserDropdown/UserDropdown";
import { Menu } from "lucide-react";

const Navbar = ({ onSearch, onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg "
          >
            <Menu className="w-5 h-5" />
          </button>
          {/* Left side - Search */}
          <div className="flex-1 flex items-center">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right side - Notifications and User */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <div className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  3
                </span>
              </div>
            </button>

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;