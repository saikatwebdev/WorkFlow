import React from 'react';
import { X } from 'lucide-react';

const CustomAutomationModal = ({ 
  isOpen, 
  isEdit, 
  customAutomation, 
  platforms, 
  triggers, 
  actions, 
  onClose, 
  onChange, 
  onSubmit 
}) => {
  const handleChange = (field, value) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-white rounded-xl p-6 w-full max-w-md transform transition-all duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Edit Custom Automation' : 'Create Custom Automation'}
          </h2>
          <button 
            onClick={onClose}
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
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Lead Follow-up"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              value={customAutomation.platform}
              onChange={(e) => handleChange('platform', e.target.value)}
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
              onChange={(e) => handleChange('trigger', e.target.value)}
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
              onChange={(e) => handleChange('action', e.target.value)}
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
              onChange={(e) => handleChange('status', e.target.value)}
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
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomAutomationModal); 