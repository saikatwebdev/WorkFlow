
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Activity, 
  Target, 
  TrendingUp,
  BarChart3,
  MoreHorizontal,
  ChevronDown,
  Clock,
  Plus,
  Play,
  Edit,
  Trash2,
  X,
  Instagram,
  Facebook,
  MessageCircle,
  MessageSquare,
  Users,
  Mail,
  ArrowUp,
  ArrowDown,
  CheckCircle
} from 'lucide-react';

// Fixed Chart.js import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserProfile = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [customQuickLaunch, setCustomQuickLaunch] = useState([]);
  const [editingAutomation, setEditingAutomation] = useState(null);
  const [deletingAutomation, setDeletingAutomation] = useState(null);
  const navigate = useNavigate();

  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalMessages: 0,
    activeAutomations: 0,
    leadsGenerated: 0,
    engagementRate: 0
  });

  const [customAutomation, setCustomAutomation] = useState({
    name: '',
    platform: '',
    trigger: '',
    action: '',
    status: 'active'
  });

  // Sample data with active automations count
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

  // Dynamic engagement data based on selected period
  const engagementData = {
    weekly: {
      title: 'Weekly Engagement',
      subtitle: 'Daily engagement rate over the past week',
      data: [
        { label: 'Mon', rate: 65 },
        { label: 'Tue', rate: 72 },
        { label: 'Wed', rate: 78 },
        { label: 'Thu', rate: 85 },
        { label: 'Fri', rate: 79 },
        { label: 'Sat', rate: 68 },
        { label: 'Sun', rate: 74 }
      ],
      colors: {
        background: 'rgba(59, 130, 246, 0.8)',
        border: 'rgba(59, 130, 246, 1)',
        gradient: ['rgba(59, 130, 246, 0.9)', 'rgba(99, 102, 241, 0.7)', 'rgba(139, 92, 246, 0.8)', 'rgba(59, 130, 246, 0.6)', 'rgba(99, 102, 241, 0.8)', 'rgba(139, 92, 246, 0.7)', 'rgba(59, 130, 246, 0.8)']
      }
    },
    monthly: {
      title: 'Monthly Engagement',
      subtitle: 'Weekly engagement rate over the past month',
      data: [
        { label: 'Week 1', rate: 68 },
        { label: 'Week 2', rate: 74 },
        { label: 'Week 3', rate: 82 },
        { label: 'Week 4', rate: 76 }
      ],
      colors: {
        background: 'rgba(34, 197, 94, 0.8)',
        border: 'rgba(34, 197, 94, 1)',
        gradient: ['rgba(34, 197, 94, 0.9)', 'rgba(59, 130, 246, 0.7)', 'rgba(168, 85, 247, 0.8)', 'rgba(239, 68, 68, 0.7)']
      }
    },
    yearly: {
      title: 'Yearly Engagement',
      subtitle: 'Monthly engagement rate over the past year',
      data: [
        { label: 'Jan', rate: 62 }, { label: 'Feb', rate: 68 }, { label: 'Mar', rate: 75 },
        { label: 'Apr', rate: 71 }, { label: 'May', rate: 79 }, { label: 'Jun', rate: 83 },
        { label: 'Jul', rate: 88 }, { label: 'Aug', rate: 85 }, { label: 'Sep', rate: 82 },
        { label: 'Oct', rate: 78 }, { label: 'Nov', rate: 76 }, { label: 'Dec', rate: 80 }
      ],
      colors: {
        background: 'rgba(245, 101, 101, 0.8)',
        border: 'rgba(245, 101, 101, 1)',
        gradient: [
          'rgba(239, 68, 68, 0.9)', 'rgba(245, 101, 101, 0.8)', 'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)', 'rgba(14, 165, 233, 0.8)', 'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.7)', 'rgba(59, 130, 246, 0.7)', 'rgba(245, 101, 101, 0.7)'
        ]
      }
    }
  };

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle }
  ];

  const triggers = [
    { id: 'new_message', name: 'New Message' },
    { id: 'new_comment', name: 'New Comment' },
    { id: 'new_follower', name: 'New Follower' },
    { id: 'story_view', name: 'Story View' }
  ];

  const actions = [
    { id: 'send_dm', name: 'Send DM' },
    { id: 'auto_reply', name: 'Auto Reply' },
    { id: 'add_tag', name: 'Add Tag' },
    { id: 'send_notification', name: 'Send Notification' }
  ];

  const currentEngagementData = engagementData[selectedPeriod];

  const quickLaunchOptions = [
    { id: 1, name: 'Email Sequence', icon: Mail, description: 'Create automated email flow', color: 'bg-blue-500' },
    { id: 2, name: 'Lead Nurturing', icon: Users, description: 'Nurture leads automatically', color: 'bg-green-500' },
    { id: 3, name: 'Welcome Series', icon: MessageSquare, description: 'Onboard new subscribers', color: 'bg-purple-500' },
    { id: 4, name: 'Re-engagement', icon: Target, description: 'Win back inactive users', color: 'bg-orange-500' },
    ...customQuickLaunch
  ];

  // Fixed chart data and options
  const chartData = {
    labels: currentEngagementData.data.map(d => d.label),
    datasets: [
      {
        label: 'Engagement Rate',
        data: currentEngagementData.data.map(d => d.rate),
        backgroundColor: currentEngagementData.colors.gradient || currentEngagementData.colors.background,
        borderColor: currentEngagementData.colors.border,
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: currentEngagementData.colors.border,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Engagement: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          borderDash: [5, 5]
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  // Animated counter effect
  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        
        setAnimatedMetrics(prev => ({
          ...prev,
          [key]: key === 'engagementRate' ? parseFloat(current.toFixed(1)) : Math.floor(current)
        }));
      }, 16);
    };

    // Start animations with staggered delays
    setTimeout(() => animateValue(0, metrics.totalMessages, 200, 'totalMessages'), 20);
    setTimeout(() => animateValue(0, metrics.activeAutomations, 200, 'activeAutomations'), 20);
    setTimeout(() => animateValue(0, metrics.leadsGenerated, 200, 'leadsGenerated'), 40);
    setTimeout(() => animateValue(0, metrics.engagementRate, 200, 'engagementRate'), 60);
  }, []);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRedirect = (cardType) => {
  switch (cardType) {
    case 'messages':
      showNotification('Redirecting to Chats page...');
      navigate('/chats'); // update with your actual route
      break;
    case 'automations':
      showNotification('Redirecting to Integration page...');
      navigate('/integration'); // update with your actual route
      break;
    default:
      break;
  }
};


  const handleCreateCustom = () => {
    if (!customAutomation.name || !customAutomation.platform || !customAutomation.trigger || !customAutomation.action) {
      showNotification('Please fill in all fields');
      return;
    }

    const newQuickLaunch = {
      id: editingAutomation ? editingAutomation.id : Date.now(),
      name: customAutomation.name,
      icon: platforms.find(p => p.id === customAutomation.platform)?.icon || MessageSquare,
      description: `${customAutomation.trigger} → ${customAutomation.action}`,
      color: 'bg-indigo-500',
      isCustom: true,
      platform: customAutomation.platform,
      trigger: customAutomation.trigger,
      action: customAutomation.action,
      status: customAutomation.status
    };

    if (editingAutomation) {
      setCustomQuickLaunch(prev => prev.map(item => 
        item.id === editingAutomation.id ? newQuickLaunch : item
      ));
      setShowEditModal(false);
      setEditingAutomation(null);
      showNotification('Automation updated successfully!');
    } else {
      setCustomQuickLaunch(prev => [...prev, newQuickLaunch]);
      setShowCustomModal(false);
      showNotification('Custom automation created successfully!');
    }

    setCustomAutomation({ name: '', platform: '', trigger: '', action: '', status: 'active' });
  };

  const handleEditAutomation = (automation) => {
    setEditingAutomation(automation);
    setCustomAutomation({
      name: automation.name,
      platform: automation.platform,
      trigger: automation.trigger,
      action: automation.action,
      status: automation.status
    });
    setShowEditModal(true);
  };

  const handleDeleteAutomation = (automation) => {
    setDeletingAutomation(automation);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingAutomation) {
      setCustomQuickLaunch(prev => prev.filter(item => item.id !== deletingAutomation.id));
      setShowDeleteModal(false);
      setDeletingAutomation(null);
      showNotification('Automation deleted successfully!');
    }
  };

  const cancelModal = () => {
    setShowCustomModal(false);
    setShowEditModal(false);
    setEditingAutomation(null);
    setCustomAutomation({ name: '', platform: '', trigger: '', action: '', status: 'active' });
  };

  // Component: MetricCard
  const MetricCard = ({ title, value, change, icon: Icon, color, onClick, isClickable = false }) => (
    <div 
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${
        isClickable ? 'cursor-pointer transform hover:scale-105' : ''
      }`}
      onClick={onClick}
    >
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
        <h3 className="text-2xl font-bold text-gray-900">
          {typeof value === 'string' ? value : value.toLocaleString()}
        </h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );

  // Component: ActivityItem
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

  // Component: QuickLaunchCard
  const QuickLaunchCard = ({ option }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group transform hover:scale-105">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <option.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {option.name}
            {option.isCustom && <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Custom</span>}
          </h3>
          <p className="text-sm text-gray-500">{option.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {option.isCustom && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditAutomation(option);
                }}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit automation"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAutomation(option);
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete automation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <Play className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </div>
  );

  // Component: CustomAutomationModal
  const CustomAutomationModal = ({ isEdit = false }) => {
    const isVisible = isEdit ? showEditModal : showCustomModal;
    
    return (
      <div className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`bg-white rounded-xl p-6 w-full max-w-md transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit Custom Automation' : 'Create Custom Automation'}
            </h2>
            <button 
              onClick={cancelModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Automation Name</label>
              <input
                type="text"
                value={customAutomation.name}
                onChange={(e) => setCustomAutomation(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Lead Follow-up"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={customAutomation.platform}
                onChange={(e) => setCustomAutomation(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Platform</option>
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.id}>{platform.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Event</label>
              <select
                value={customAutomation.trigger}
                onChange={(e) => setCustomAutomation(prev => ({ ...prev, trigger: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Trigger</option>
                {triggers.map(trigger => (
                  <option key={trigger.id} value={trigger.name}>{trigger.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
              <select
                value={customAutomation.action}
                onChange={(e) => setCustomAutomation(prev => ({ ...prev, action: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Action</option>
                {actions.map(action => (
                  <option key={action.id} value={action.name}>{action.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={customAutomation.status}
                onChange={(e) => setCustomAutomation(prev => ({ ...prev, status: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t mt-6">
            <button
              onClick={cancelModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCustom}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Component: DeleteConfirmationModal
  const DeleteConfirmationModal = () => (
    <div className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300 ${
      showDeleteModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-white rounded-xl p-6 w-full max-w-md transform transition-all duration-300 ${
        showDeleteModal ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Delete Automation</h2>
          <button 
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to delete "{deletingAutomation?.name}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  // Component: Toast
  const Toast = () => (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      showToast ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
    }`}>
      <div className="px-6 py-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center space-x-3">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">{toastMessage}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Automation Performance</h2>
          <p className="text-gray-600 mt-2">Track and optimize your automation campaigns</p>
        </div>

        {/* Metrics Cards with Animation and Redirects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Messages Sent"
            value={animatedMetrics.totalMessages}
            change={metrics.messageGrowth}
            icon={Send}
            color="bg-blue-500"
            onClick={() => handleRedirect('messages')}
            isClickable={true}
          />
          <MetricCard
            title="Active Automations"
            value={animatedMetrics.activeAutomations}
            change={metrics.automationGrowth}
            icon={Activity}
            color="bg-green-500"
            onClick={() => handleRedirect('automations')}
            isClickable={true}
          />
          <MetricCard
            title="Leads Generated"
            value={animatedMetrics.leadsGenerated}
            change={metrics.leadGrowth}
            icon={Target}
            color="bg-purple-500"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${animatedMetrics.engagementRate}%`}
            change={metrics.engagementGrowth}
            icon={TrendingUp}
            color="bg-orange-500"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Fixed Chart.js Bar Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{currentEngagementData.title}</h3>
                  <p className="text-sm text-gray-500">{currentEngagementData.subtitle}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="h-64">
                <Bar data={chartData} options={chartOptions} />
              </div>
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

        {/* Quick Launch Automations with Custom Modal */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Launch</h3>
              <p className="text-sm text-gray-500">Start new automation campaigns instantly</p>
            </div>
            <button 
              onClick={() => setShowCustomModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
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

        {/* Create Custom Automation Modal */}
        <CustomAutomationModal isEdit={false} />

        {/* Edit Custom Automation Modal */}
        <CustomAutomationModal isEdit={true} />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal />

        {/* Toast Notification */}
        <Toast />
      </main>
    </div>
  );
};

export default UserProfile;