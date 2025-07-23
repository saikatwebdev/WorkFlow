import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Loader2, Check } from 'lucide-react';
import { platforms, triggers, automationLogics } from '../../data/platformData';

const AutomationModal = ({ editingAutomation, connectedAccounts, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [automationData, setAutomationData] = useState({
    name: '',
    platform: '',
    accountId: '',
    trigger: '',
    logic: '',
    schedule: 'event-driven',
    customSchedule: ''
  });

  useEffect(() => {
    if (editingAutomation) {
      setAutomationData({
        name: editingAutomation.name || '',
        platform: editingAutomation.platform || '',
        accountId: editingAutomation.accountId || '',
        trigger: editingAutomation.trigger || '',
        logic: editingAutomation.logic || '',
        schedule: editingAutomation.schedule || 'event-driven',
        customSchedule: editingAutomation.customSchedule || ''
      });
    }
  }, [editingAutomation]);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const platformAccounts = connectedAccounts.filter(
    acc => acc.platform === automationData.platform
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1: return automationData.platform && automationData.accountId;
      case 2: return automationData.trigger;
      case 3: return automationData.logic;
      case 4: return true;
      case 5: return automationData.name;
      default: return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave(automationData);
      setIsLoading(false);
    }, 1500);
  };

  const stepTitles = [
    'Choose Platform',
    'Select Trigger',
    'Define Logic',
    'Schedule',
    'Review & Name'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Platform & Account</h3>
              <div className="space-y-3">
                {Object.entries(platforms).map(([key, platform]) => {
                  const Icon = platform.icon;
                  const accounts = connectedAccounts.filter(acc => acc.platform === key);
                  
                  if (accounts.length === 0) return null;
                  
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                          <Icon size={20} />
                        </div>
                        <span className="font-medium text-gray-900">{platform.name}</span>
                      </div>
                      {accounts.map(account => (
                        <label
                          key={account.id}
                          className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                            automationData.platform === key && automationData.accountId === account.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="account"
                            value={account.id}
                            checked={automationData.platform === key && automationData.accountId === account.id}
                            onChange={() => setAutomationData({
                              ...automationData,
                              platform: key,
                              accountId: account.id
                            })}
                            className="sr-only"
                          />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {account.phoneNumber || account.username || account.pageNames?.[0] || 'Account'}
                              </p>
                              <p className="text-sm text-gray-500">{account.connectionType}</p>
                            </div>
                            {automationData.platform === key && automationData.accountId === account.id && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <Check size={14} className="text-white" />
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  );
                })}
                
                {connectedAccounts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">No connected accounts found.</p>
                    <p className="text-sm text-gray-400">Please connect a social platform first.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Trigger</h3>
              <p className="text-sm text-gray-500 mb-4">
                Choose what will activate this automation
              </p>
              <div className="grid grid-cols-1 gap-3">
                {triggers[automationData.platform]?.map(trigger => (
                  <label
                    key={trigger}
                    className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                      automationData.trigger === trigger
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="trigger"
                      value={trigger}
                      checked={automationData.trigger === trigger}
                      onChange={(e) => setAutomationData({
                        ...automationData,
                        trigger: e.target.value
                      })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{trigger}</span>
                      {automationData.trigger === trigger && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Define Automation Logic</h3>
              <p className="text-sm text-gray-500 mb-4">
                What should happen when the trigger is activated?
              </p>
              <div className="grid grid-cols-1 gap-3">
                {automationLogics.map(logic => (
                  <label
                    key={logic.id}
                    className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                      automationData.logic === logic.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="logic"
                      value={logic.name}
                      checked={automationData.logic === logic.name}
                      onChange={(e) => setAutomationData({
                        ...automationData,
                        logic: e.target.value
                      })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{logic.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{logic.description}</p>
                      </div>
                      {automationData.logic === logic.name && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Settings</h3>
              <p className="text-sm text-gray-500 mb-4">
                When should this automation run?
              </p>
              <div className="space-y-3">
                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                  automationData.schedule === 'event-driven'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="schedule"
                    value="event-driven"
                    checked={automationData.schedule === 'event-driven'}
                    onChange={(e) => setAutomationData({
                      ...automationData,
                      schedule: e.target.value
                    })}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Event-driven</p>
                      <p className="text-sm text-gray-500 mt-1">Run immediately when trigger occurs</p>
                    </div>
                    {automationData.schedule === 'event-driven' && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </label>

                <label className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                  automationData.schedule === 'scheduled'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="schedule"
                    value="scheduled"
                    checked={automationData.schedule === 'scheduled'}
                    onChange={(e) => setAutomationData({
                      ...automationData,
                      schedule: e.target.value
                    })}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Scheduled</p>
                      <p className="text-sm text-gray-500 mt-1">Run at specific times</p>
                    </div>
                    {automationData.schedule === 'scheduled' && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </label>

                {automationData.schedule === 'scheduled' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule Time
                    </label>
                    <input
                      type="time"
                      value={automationData.customSchedule}
                      onChange={(e) => setAutomationData({
                        ...automationData,
                        customSchedule: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preview & Name</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Automation Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform:</span>
                    <span className="font-medium">{platforms[automationData.platform]?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Trigger:</span>
                    <span className="font-medium">{automationData.trigger}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Action:</span>
                    <span className="font-medium">{automationData.logic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Schedule:</span>
                    <span className="font-medium">
                      {automationData.schedule === 'event-driven' 
                        ? 'Event-driven' 
                        : `Daily at ${automationData.customSchedule}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Automation Name
                </label>
                <input
                  type="text"
                  value={automationData.name}
                  onChange={(e) => setAutomationData({
                    ...automationData,
                    name: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Welcome Message Bot"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header with Progress */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingAutomation ? 'Edit Automation' : 'Create Automation'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          {isLoading && currentStep > totalSteps ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={48} className="animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Creating your automation...</p>
            </div>
          ) : (
            renderStepContent()
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!canProceed() || isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {editingAutomation ? 'Save Changes' : 'Create Automation'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationModal;