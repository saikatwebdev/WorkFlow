import React, { useState } from 'react';
import { 
  Settings, 
  FileText, 
  Share2,
  X,
  LogOut,
  BarChart3,
  Users,
  Activity,
  Menu // Added Menu icon for toggle button
} from 'lucide-react';

// Import dashboard section components
import UserProfile from '../components/DashboardSections/UserProfile';
import Analytics from '../components/DashboardSections/Analytics';
import AIFineTuning from '../components/DashboardSections/AIFineTuning/AIFineTuning';
import Integration from '../components/DashboardSections/Integration/Integration';
import SalesReport from '../components/DashboardSections/SalesReport';
import Navbar from '../components/Navbar/Navbar';

const WorkFlowDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('User Profile');

  const menuItems = [
    { icon: Users, label: 'User Profile' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'AI Fine-Tuning' },
    { icon: Share2, label: 'Integration' },
    { icon: FileText, label: 'Sales & Reports' },
  ];

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  // Function to render the active section component
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'User Profile':
        return <UserProfile />;
      case 'Analytics':
        return <Analytics />;
      case 'AI Fine-Tuning':
        return <AIFineTuning />;
      case 'Integration':
        return <Integration />;
      case 'Sales & Reports':
        return <SalesReport />;
      default:
        return <UserProfile />;
    }
  };

  const Sidebar = () => (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-lg z-50 animate-fadeIn lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:w-16 lg:shadow-sm flex flex-col`}>
        {/* Logo */}
        <div className="p-4 lg:p-3 flex items-center justify-between lg:justify-center">
          <div className="flex items-center space-x-3 lg:space-x-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 lg:hidden">WorkFlow</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 lg:px-3 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSectionClick(item.label)}
              className={`flex items-center space-x-3 lg:space-x-0 lg:justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                activeSection === item.label 
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 lg:border-r-0 lg:bg-blue-500 lg:text-white' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 lg:hover:bg-blue-50 lg:hover:text-blue-600'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="lg:hidden font-medium">{item.label}</span>
              
              {/* Tooltip for desktop */}
              <div className="hidden lg:group-hover:block absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
                {item.label}
              </div>
            </div>
          ))}
        </nav>

        {/* Sign out */}
        <div className="p-4 lg:p-3 border-t border-gray-200">
          <div className="flex items-center space-x-3 lg:space-x-0 lg:justify-center p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 transition-all duration-200 group">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="lg:hidden font-medium">Sign Out</span>
            
            {/* Tooltip for desktop */}
            <div className="hidden lg:group-hover:block absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-10">
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Toggle Button - Fixed position at top left */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <Navbar onSearch={(query) => console.log('Search:', query)} />

        {/* Main Content */}
        <main className="flex-1 p-2 lg:p-2 overflow-y-auto">
          {/* Content Area */}
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default WorkFlowDashboard;
