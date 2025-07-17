import React from 'react';
import { 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Copy,
  MoreHorizontal,
  Instagram,
  MessageCircle,
  Facebook,
  Zap,
  Target
} from 'lucide-react';

const AutomationCard = ({ 
  automation, 
  showDropdown, 
  setShowDropdown, 
  toggleAutomationStatus, 
  copyAutomation, 
  handleDeleteAutomation 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'WhatsApp': return <MessageCircle className="w-4 h-4" />;
      case 'Facebook': return <Facebook className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            {getPlatformIcon(automation.platform)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{automation.name}</h3>
            <p className="text-sm text-gray-500">{automation.platform}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(automation.status)}`}>
            {automation.status}
          </span>
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(showDropdown === automation.id ? null : automation.id)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showDropdown === automation.id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-2">
                  <button
                    onClick={() => {
                      toggleAutomationStatus(automation.id);
                      setShowDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    {automation.status === 'active' ? (
                      <><Pause className="w-4 h-4" /><span>Pause</span></>
                    ) : (
                      <><Play className="w-4 h-4" /><span>Activate</span></>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      // Edit functionality would go here
                      setShowDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      copyAutomation(automation.id);
                      setShowDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      handleDeleteAutomation(automation.id);
                      setShowDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">Trigger: {automation.trigger}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">Action: {automation.action}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Runs: {automation.runs}</span>
        <span>Last run: {automation.lastRun}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {automation.status === 'active' ? (
            <button 
              onClick={() => toggleAutomationStatus(automation.id)}
              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
            >
              <Pause className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => toggleAutomationStatus(automation.id)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => copyAutomation(automation.id)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={() => handleDeleteAutomation(automation.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AutomationCard;