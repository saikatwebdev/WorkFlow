import React, { useState } from 'react';
import Sidebar from '../components/DashBoard/layout/Sidebar';
import Header from '../components/DashBoard/layout/Header';
import DashboardHeader from '../components/DashBoard/DashboardHeader';
import MetricCard from '../components/DashBoard/ui/MetricCard';
import DashboardCard from '../components/DashBoard/ui/DashboardCard';
import CircularChart from '../components/DashBoard/charts/CircularChart';
import BarChart from '../components/DashBoard/charts/BarChart';
import StatCard from '../components/DashBoard/ui/StarCard';

// Icon imports for this page
import {
  Home, BarChart3, Target, Mail, Calendar, Clock, FileText, MessageSquare, Users, Settings, LogOut,
  DollarSign, User, ShoppingCart, Activity, TrendingUp
} from 'lucide-react';

// --- Data Constants ---
// Moved outside the component to prevent re-creation on every render.
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
  { icon: LogOut, label: 'Sign Out', isSignOut: true },
];

const salesData = [
  { month: 'Jan \'11', sales: 50, revenue: 55 }, { month: '02 Jan', sales: 60, revenue: 75 },
  { month: '03 Jan', sales: 45, revenue: 60 }, { month: '04 Jan', sales: 70, revenue: 75 },
  { month: '05 Jan', sales: 40, revenue: 35 }, { month: '06 Jan', sales: 65, revenue: 70 }
];

const metricCardsData = [
  { icon: DollarSign, value: "$4,350", label: "Earned this month", color: "bg-gradient-to-br from-green-500 to-emerald-600", trend: "12.5" },
  { icon: User, value: "583", label: "New Clients", color: "bg-gradient-to-br from-blue-500 to-indigo-600", trend: "8.2" },
  { icon: ShoppingCart, value: "1,289", label: "New Sales", color: "bg-gradient-to-br from-purple-500 to-pink-600", trend: "15.7" },
];

const statCardsData = [
    { icon: Activity, label: "Active Users", value: "2,847", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
    { icon: TrendingUp, label: "Growth Rate", value: "+23.1%", iconBg: "bg-green-100", iconColor: "text-green-600" },
    { icon: Users, label: "Team Members", value: "156", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
    { icon: Target, label: "Goal Progress", value: "87%", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
];

const userProfile = {
  name: "Thomas Anree",
  title: "UX Designer",
  initial: "T"
};

// --- Main Component ---
const WorkFlowDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        menuItems={menuItems}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          setSidebarOpen={setSidebarOpen}
          user={userProfile}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <DashboardHeader title="Sales Analytics" subtitle="Track your business performance with real-time insights" />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            <div className="lg:col-span-4">
              <DashboardCard title="Email Sent" subtitle="Detailed inbox analytics" dropdownLabel="Monthly">
                <CircularChart percentage={49.5} />
              </DashboardCard>
            </div>

            <div className="lg:col-span-5">
              <DashboardCard title="Sales Graph" subtitle="Total sales analytics" dropdownLabel="This Week">
                <BarChart data={salesData} />
              </DashboardCard>
            </div>
            
            <div className="lg:col-span-3 space-y-4">
              {metricCardsData.map((card, index) => (
                <MetricCard
                  key={index}
                  icon={card.icon}
                  value={card.value}
                  label={card.label}
                  color={card.color}
                  trend={card.trend}
                  index={index}
                  isHovered={hoveredCard === index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                />
              ))}
            </div>
          </div>
          
          {/* Additional Stats Row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCardsData.map((stat, index) => (
                <StatCard 
                    key={index}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    iconBg={stat.iconBg}
                    iconColor={stat.iconColor}
                />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkFlowDashboard;