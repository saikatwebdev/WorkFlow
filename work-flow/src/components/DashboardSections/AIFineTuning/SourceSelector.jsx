import React, { useState } from 'react';
import { Plus, Upload, Link, FileText, HelpCircle } from 'lucide-react';

const SourceSelector = ({ onSourceSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sourceOptions = [
    {
      id: 'file',
      icon: Upload,
      label: 'Upload File',
      subtitle: 'pdf, txt',
      color: 'text-blue-600'
    },
    {
      id: 'url',
      icon: Link,
      label: 'URL(s)',
      subtitle: 'websites, links',
      color: 'text-green-600'
    },
    {
      id: 'text',
      icon: FileText,
      label: 'Plain Text',
      subtitle: 'about, briefs',
      color: 'text-purple-600'
    },
    {
      id: 'qa',
      icon: HelpCircle,
      label: 'Q&A',
      subtitle: 'FAQs',
      color: 'text-orange-600'
    }
  ];

  const handleSourceClick = (sourceId) => {
    onSourceSelect(sourceId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px]">
      {/* Main Plus Button */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-20 h-20 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-8 h-8 text-white" />
        </button>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50">
            <div className="px-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add Content Source</h3>
              <p className="text-sm text-gray-500 mt-1">Choose how you'd like to add content</p>
            </div>
            
            <div className="py-2">
              {sourceOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSourceClick(option.id)}
                    className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className={`p-2 rounded-lg bg-gray-50 ${option.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Feed this campaign with helpful context
        </h3>
        <p className="text-gray-500">
          Files, Text, Website or Q&A
        </p>
      </div>

      {/* Overlay to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default SourceSelector;