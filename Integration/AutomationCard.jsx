import React from 'react';
import { 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Copy,
  MoreHorizontal,
  Zap,
  Target
} from 'lucide-react';

// Instagram Icon Component
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Facebook Icon Component
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
  </svg>
);

const AutomationCard = ({ 
  automation, 
  showDropdown, 
  setShowDropdown, 
  toggleAutomationStatus, 
  copyAutomation, 
  handleDeleteAutomation,
  handleEditAutomation
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'paused': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'draft': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPlatformIcon = (platform) => {
    const iconProps = { className: "w-5 h-5 text-white" };
    switch (platform) {
      case 'Instagram': return <InstagramIcon {...iconProps} />;
      case 'WhatsApp': return <WhatsAppIcon {...iconProps} />;
      case 'Facebook': return <FacebookIcon {...iconProps} />;
      default: return <Zap {...iconProps} />;
    }
  };

  const getPlatformGradient = (platform) => {
    switch (platform) {
      case 'Instagram': return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'WhatsApp': return 'bg-gradient-to-br from-green-500 to-emerald-500';
      case 'Facebook': return 'bg-gradient-to-br from-blue-500 to-blue-600';
      default: return 'bg-gradient-to-br from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-blue-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transition-opacity duration-500 group-hover:opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl transform rotate-45"></div>
      </div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl ${getPlatformGradient(automation.platform)} flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
              {getPlatformIcon(automation.platform)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg leading-tight">{automation.name}</h3>
              <p className="text-sm text-slate-500 font-medium">{automation.platform}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${getStatusColor(automation.status)}`}>
              {automation.status}
            </span>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(showDropdown === automation.id ? null : automation.id)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              {showDropdown === automation.id && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        toggleAutomationStatus(automation.id);
                        setShowDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-3 transition-colors duration-200"
                    >
                      {automation.status === 'active' ? (
                        <><Pause className="w-4 h-4 text-amber-500" /><span>Pause</span></>
                      ) : (
                        <><Play className="w-4 h-4 text-emerald-500" /><span>Activate</span></>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleEditAutomation(automation.id);
                        setShowDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-3 transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4 text-blue-500" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        copyAutomation(automation.id);
                        setShowDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-3 transition-colors duration-200"
                    >
                      <Copy className="w-4 h-4 text-purple-500" />
                      <span>Duplicate</span>
                    </button>
                    <hr className="my-1 border-slate-100" />
                    <button
                      onClick={() => {
                        handleDeleteAutomation(automation.id);
                        setShowDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200"
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

        {/* Automation Details */}
        <div className="space-y-4 mb-5">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-blue-900">Trigger</span>
              <p className="text-sm text-blue-700">{automation.trigger}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-emerald-900">Action</span>
              <p className="text-sm text-emerald-700">{automation.action}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-slate-500 mb-5 p-3 bg-slate-50 rounded-xl">
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Runs: <span className="font-semibold text-slate-700">{automation.runs}</span></span>
          </span>
          <span>Last: <span className="font-semibold text-slate-700">{automation.lastRun}</span></span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {automation.status === 'active' ? (
              <button 
                onClick={() => toggleAutomationStatus(automation.id)}
                className="p-3 text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-110"
                title="Pause"
              >
                <Pause className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={() => toggleAutomationStatus(automation.id)}
                className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 hover:scale-110"
                title="Activate"
              >
                <Play className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => handleEditAutomation(automation.id)}
              className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110"
              title="Edit"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={() => copyAutomation(automation.id)}
              className="p-3 text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110"
              title="Duplicate"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={() => handleDeleteAutomation(automation.id)}
            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationCard;