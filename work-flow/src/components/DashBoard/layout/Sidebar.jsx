import React from 'react';
import PropTypes from 'prop-types';
import { Activity, X } from 'lucide-react';

const NavItem = ({ item, isActive }) => {
  const baseClasses = "flex items-center space-x-3 lg:space-x-0 lg:justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 group relative";
  const activeClasses = 'bg-blue-50 text-blue-600 lg:bg-blue-500 lg:text-white';
  const inactiveClasses = 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 lg:hover:bg-blue-50 lg:hover:text-blue-600';
  const signOutClasses = 'text-red-600 hover:bg-red-50';

  const appliedClasses = `${baseClasses} ${isActive ? activeClasses : item.isSignOut ? signOutClasses : inactiveClasses}`;

  return (
    <div className={appliedClasses}>
      <item.icon className="w-5 h-5 flex-shrink-0" />
      <span className="lg:hidden font-medium">{item.label}</span>
      <div className="hidden lg:group-hover:block absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
        {item.label}
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen, menuItems }) => {
  const mainNavItems = menuItems.filter(item => !item.isSignOut);
  const signOutItem = menuItems.find(item => item.isSignOut);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:w-16 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 lg:p-3 flex items-center justify-between lg:justify-center">
          <div className="flex items-center space-x-3 lg:space-x-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 lg:hidden">Analytics</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 lg:px-3 py-6 space-y-2">
          {mainNavItems.map((item, index) => (
            <NavItem key={index} item={item} isActive={item.active} />
          ))}
        </nav>

        {/* Sign out */}
        {signOutItem && (
          <div className="p-4 lg:p-3 border-t border-gray-200">
            <NavItem item={signOutItem} />
          </div>
        )}
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool,
    isSignOut: PropTypes.bool,
  })).isRequired,
};

export default Sidebar;