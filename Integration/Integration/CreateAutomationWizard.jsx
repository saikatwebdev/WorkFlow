import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, MessageSquare, Smartphone, Instagram } from 'lucide-react';

// Form data structure
const initialFormData = {
  fullName: '',
  category: '',
  goal: '',
  industry: '',
  useCase: '',
  description: '',
  platform: ''
};

// Categories for Step 2
const categories = [
  'Startup Founder',
  'Consultant',
  'Freelancer',
  'Executive',
  'Entrepreneur',
  'Business Owner'
];

// Goals for Step 3
const goals = [
  'Automate Customer Support',
  'Generate Leads',
  'Increase Engagement',
  'Gather Feedback',
  'Book Appointments',
  'Sell Products'
];

// Industries for Step 4
const industries = [
  'E-commerce',
  'SaaS',
  'Healthcare',
  'Education',
  'Finance',
  'Real Estate',
  'Retail',
  'Other'
];

// Platforms for Step 7
const platformOptions = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'bg-green-500' },
  { id: 'messenger', name: 'Messenger', icon: MessageSquare, color: 'bg-blue-500' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' }
];

const CreateAutomationWizard = ({ onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Personal Information',
    'Select Your Category',
    'Set Your Goal',
    'Choose Your Industry',
    'Main Use Case',
    'Describe Yourself',
    'Choose Platform'
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.fullName.trim() !== '';
      case 2: return formData.category !== '';
      case 3: return formData.goal !== '';
      case 4: return formData.industry !== '';
      case 5: return formData.useCase.trim() !== '';
      case 6: return formData.description.trim() !== '';
      case 7: return formData.platform !== '';
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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSave(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Which category best describes you?</h3>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.category === category
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={() => setFormData({...formData, category})}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{category}</span>
                    {formData.category === category && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">What's your main goal with Workflow?</h3>
            <p className="text-sm text-gray-500 mb-4">
              This will help us customize your experience.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {goals.map((goal) => (
                <label
                  key={goal}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.goal === goal
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={goal}
                    checked={formData.goal === goal}
                    onChange={() => setFormData({...formData, goal})}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{goal}</span>
                    {formData.goal === goal && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">What industry are you in?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Select the industry that best describes your business.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {industries.map((industry) => (
                <label
                  key={industry}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.industry === industry
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="industry"
                    value={industry}
                    checked={formData.industry === industry}
                    onChange={() => setFormData({...formData, industry})}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{industry}</span>
                    {formData.industry === industry && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">What's your main use case?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Briefly describe what you want to achieve with this automation.
            </p>
            <textarea
              value={formData.useCase}
              onChange={(e) => setFormData({...formData, useCase: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
              placeholder="Example: I want to automate responses to common customer questions on WhatsApp..."
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Describe yourself in 1-2 lines</h3>
            <p className="text-sm text-gray-500 mb-4">
              This will help us personalize your automation experience.
            </p>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
              placeholder="Example: I'm a small business owner looking to improve customer engagement..."
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Platform to Build Automation</h3>
              <p className="text-gray-500 text-sm">Select the platform where you want to create your automation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {platformOptions.map((platform) => {
                const Icon = platform.icon;
                return (
                  <div
                    key={platform.id}
                    onClick={() => setFormData({...formData, platform: platform.id})}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all flex flex-col items-center ${
                      formData.platform === platform.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-14 h-14 ${platform.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{platform.name}</span>
                    {formData.platform === platform.id && (
                      <div className="mt-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create Automation
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4 max-h-[60vh] overflow-y-auto">
          <div className="max-w-md mx-auto">
            {renderStepContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-3">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={18} />
                Back
              </button>
            ) : (
              <div className="flex-1"></div> // Spacer to push the next button to the right
            )}
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="ml-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isLoading}
                className="ml-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Automation'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAutomationWizard;
