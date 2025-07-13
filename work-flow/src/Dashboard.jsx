import React, { useState } from 'react';
import { 
  Search, 
  Moon, 
  Calendar, 
  Bell, 
  Mail, 
  Home, 
  Grid3X3, 
  Target, 
  Settings, 
  MessageSquare, 
  Clock, 
  FileText, 
  Share2,
  ChevronDown,
  MoreHorizontal,
  Plus,
  HelpCircle,
  User,
  ShoppingCart,
  DollarSign,
  Menu,
  X,
  LogOut,
  TrendingUp,
  BarChart3,
  Users,
  Activity
} from 'lucide-react';

const SalesAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample data for charts
  const salesData = [
    { month: 'Jan \'11', sales: 50, revenue: 55 },
    { month: '02 Jan', sales: 60, revenue: 75 },
    { month: '03 Jan', sales: 45, revenue: 60 },
    { month: '04 Jan', sales: 70, revenue: 75 },
    { month: '05 Jan', sales: 40, revenue: 35 },
    { month: '06 Jan', sales: 65, revenue: 70 }
  ];

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Target, label: 'Goals' },
    { icon: Mail, label: 'Messages' },
    { icon: Calendar, label: 'Calendar' },
    { icon: Clock, label: 'Schedule' },
    { icon: FileText, label: 'Documents' },
    { icon: MessageSquare, label: 'Chat' },
    { icon: Users, label: 'Team' },
    { icon: Settings, label: 'Settings' },
  ];

  const CircularChart = ({ percentage, title, subtitle }) => {
    const radius = 80;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Animated progress circle */}
            <circle
              stroke="#3b82f6"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ 
                strokeDashoffset,
                transition: 'stroke-dashoffset 1s ease-in-out'
              }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Secondary progress circle */}
            <circle
              stroke="#10b981"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ 
                strokeDashoffset: strokeDashoffset + 50,
                transition: 'stroke-dashoffset 1s ease-in-out 0.3s'
              }}
              strokeLinecap="round"
              r={normalizedRadius - 15}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Sent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Receive</span>
          </div>
        </div>
      </div>
    );
  };

  const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.revenue)));
    
    return (
      <div className="flex items-end justify-center space-x-2 sm:space-x-4 h-48">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center space-y-2 group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-end space-x-1">
              <div 
                className="w-3 sm:w-4 bg-blue-500 rounded-t transition-all duration-700 ease-out transform group-hover:scale-110"
                style={{ 
                  height: `${(item.sales / maxValue) * 120}px`,
                  animation: `slideUp 0.8s ease-out ${index * 0.1}s both`
                }}
              ></div>
              <div 
                className="w-3 sm:w-4 bg-green-500 rounded-t transition-all duration-700 ease-out transform group-hover:scale-110"
                style={{ 
                  height: `${(item.revenue / maxValue) * 120}px`,
                  animation: `slideUp 0.8s ease-out ${index * 0.1 + 0.1}s both`
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 transition-colors group-hover:text-gray-700">
              {item.month}
            </span>
          </div>
        ))}
        <style jsx>{`
          @keyframes slideUp {
            from {
              height: 0;
              opacity: 0;
            }
            to {
              height: var(--final-height);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  };

  const MetricCard = ({ icon: Icon, value, label, color, trend, index }) => (
    <div 
      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        hoveredCard === index ? 'ring-2 ring-blue-200' : ''
      }`}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
          <div className="text-sm text-gray-500 mb-2">{label}</div>
          {trend && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
          hoveredCard === index ? 'rotate-12' : ''
        }`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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
            <span className="text-xl font-bold text-gray-900 lg:hidden">Analytics</span>
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
              className={`flex items-center space-x-3 lg:space-x-0 lg:justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                item.active 
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
        {/* Header */}
        <header className="bg-white shadow-sm px-4 lg:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 sm:w-64 transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="hidden sm:block text-gray-500 hover:text-gray-700 transition-colors">
                <Moon className="w-5 h-5" />
              </button>
              <Calendar className="w-5 h-5 text-gray-400 hidden sm:block" />
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              <Mail className="w-5 h-5 text-gray-400 hidden sm:block" />
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-gray-900">Thomas Anree</div>
                  <div className="text-xs text-gray-500">UX Designer</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-medium">T</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Header Section */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Sales Analytics
                </h1>
                <p className="text-gray-500 text-sm lg:text-base">
                  Track your business performance with real-time insights
                </p>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Email Chart */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Sent</h3>
                    <p className="text-sm text-gray-500">Detailed inbox analytics</p>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-500">{selectedPeriod}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <CircularChart percentage={49.5} />
              </div>
            </div>

            {/* Sales Graph */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Sales Graph</h3>
                    <p className="text-sm text-gray-500">Total sales analytics</p>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-500">{selectedWeek}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Sales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                </div>
                
                <BarChart data={salesData} />
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="lg:col-span-3 space-y-4">
              <MetricCard 
                icon={DollarSign}
                value="$4,350"
                label="Earned this month"
                color="bg-gradient-to-br from-green-500 to-emerald-600"
                trend="12.5"
                index={0}
              />
              <MetricCard 
                icon={User}
                value="583"
                label="New Clients"
                color="bg-gradient-to-br from-blue-500 to-indigo-600"
                trend="8.2"
                index={1}
              />
              <MetricCard 
                icon={ShoppingCart}
                value="1,289"
                label="New Sales"
                color="bg-gradient-to-br from-purple-500 to-pink-600"
                trend="15.7"
                index={2}
              />
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Active Users</div>
                  <div className="text-lg font-bold text-gray-900">2,847</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Growth Rate</div>
                  <div className="text-lg font-bold text-gray-900">+23.1%</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Team Members</div>
                  <div className="text-lg font-bold text-gray-900">156</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Goal Progress</div>
                  <div className="text-lg font-bold text-gray-900">87%</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesAnalyticsDashboard;