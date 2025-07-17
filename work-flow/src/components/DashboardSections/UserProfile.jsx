import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  ChevronDown,
  MoreHorizontal,
  Plus,
  Send,
  Users,
  Target,
  TrendingUp,
  Activity,
  Play,
  Pause,
  MessageSquare,
  Mail,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const UserProfile = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');
  
  // Sample data
  const metrics = {
    totalMessages: 15420,
    activeAutomations: 12,
    leadsGenerated: 487,
    engagementRate: 78.5,
    messageGrowth: 12.5,
    leadGrowth: 8.3,
    engagementGrowth: -2.1,
    automationGrowth: 3.2
  };

  const recentActivity = [
    { id: 1, type: 'automation', name: 'Welcome Series', action: 'Started', time: '2 mins ago', status: 'active' },
    { id: 2, type: 'lead', name: 'John Doe', action: 'Generated', time: '5 mins ago', status: 'new' },
    { id: 3, type: 'message', name: 'Newsletter Campaign', action: 'Sent', time: '12 mins ago', status: 'sent' },
    { id: 4, type: 'automation', name: 'Abandoned Cart', action: 'Paused', time: '1 hour ago', status: 'paused' },
    { id: 5, type: 'lead', name: 'Sarah Smith', action: 'Generated', time: '2 hours ago', status: 'new' }
  ];

  const quickLaunchOptions = [
    { id: 1, name: 'Email Sequence', icon: Mail, description: 'Create automated email flow', color: 'bg-blue-500' },
    { id: 2, name: 'Lead Nurturing', icon: Users, description: 'Nurture leads automatically', color: 'bg-green-500' },
    { id: 3, name: 'Welcome Series', icon: MessageSquare, description: 'Onboard new subscribers', color: 'bg-purple-500' },
    { id: 4, name: 'Re-engagement', icon: Target, description: 'Win back inactive users', color: 'bg-orange-500' }
  ];

  const engagementData = [
    { day: 'Mon', rate: 65 },
    { day: 'Tue', rate: 72 },
    { day: 'Wed', rate: 78 },
    { day: 'Thu', rate: 85 },
    { day: 'Fri', rate: 79 },
    { day: 'Sat', rate: 68 },
    { day: 'Sun', rate: 74 }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center space-x-1">
          {change > 0 ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );

  const EngagementChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.rate));
    
    return (
      <div className="flex items-end justify-between h-32 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 flex-1">
            <div 
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
              style={{ height: `${(item.rate / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs text-gray-500 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
    );
  };

  const ActivityItem = ({ activity }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'paused': return 'bg-yellow-100 text-yellow-800';
        case 'new': return 'bg-blue-100 text-blue-800';
        case 'sent': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getIcon = (type) => {
      switch (type) {
        case 'automation': return <Activity className="w-4 h-4" />;
        case 'lead': return <Users className="w-4 h-4" />;
        case 'message': return <MessageSquare className="w-4 h-4" />;
        default: return <CheckCircle className="w-4 h-4" />;
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          {getIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900 truncate">{activity.name}</p>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
              {activity.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">{activity.action} • {activity.time}</p>
        </div>
      </div>
    );
  };

  const QuickLaunchCard = ({ option }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <option.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {option.name}
          </h3>
          <p className="text-sm text-gray-500">{option.description}</p>
        </div>
        <Play className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Automation Performance</h2>
          <p className="text-gray-600 mt-2">Track and optimize your automation campaigns</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Messages Sent"
            value={metrics.totalMessages}
            change={metrics.messageGrowth}
            icon={Send}
            color="bg-blue-500"
          />
          <MetricCard
            title="Active Automations"
            value={metrics.activeAutomations}
            change={metrics.automationGrowth}
            icon={Activity}
            color="bg-green-500"
          />
          <MetricCard
            title="Leads Generated"
            value={metrics.leadsGenerated}
            change={metrics.leadGrowth}
            icon={Target}
            color="bg-purple-500"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${metrics.engagementRate}%`}
            change={metrics.engagementGrowth}
            icon={TrendingUp}
            color="bg-orange-500"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Engagement Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Weekly Engagement</h3>
                  <p className="text-sm text-gray-500">Daily engagement rate over the past week</p>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <EngagementChart data={engagementData} />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-1">
              {recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Launch Automations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Launch</h3>
              <p className="text-sm text-gray-500">Start new automation campaigns instantly</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Custom</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLaunchOptions.map((option) => (
              <QuickLaunchCard key={option.id} option={option} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;