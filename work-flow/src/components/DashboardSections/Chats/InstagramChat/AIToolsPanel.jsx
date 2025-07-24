import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Sparkles, MessageSquare, User, Zap } from 'lucide-react';
import ChatSummary from './ChatSummary';
import QuickReplies from './QuickReplies';
import StatusUpdate from './StatusUpdate';

const AIToolsPanel = ({
  contact,
  messages = [],
  onQuickReplySelect,
  onStatusUpdate,
  onNoteSubmit,
  defaultTab = 'summary',
  isExpanded: isExpandedProp = true,
  onToggleExpand,
}) => {
  const [aiToolTab, setAiToolTab] = useState(defaultTab);
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (onToggleExpand) {
      onToggleExpand(newExpandedState);
    }
  };

  const handleStatusUpdate = (status) => {
    if (onStatusUpdate) {
      onStatusUpdate(status);
    }
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-900">AI Assistant</h3>
        </div>
        <button 
          onClick={handleToggleExpand}
          className="p-1 text-gray-400 hover:text-gray-600"
          aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {isExpanded && contact && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setAiToolTab('summary')}
              className={`flex-1 py-2 text-sm font-medium flex items-center justify-center space-x-1 ${
                aiToolTab === 'summary'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Summary</span>
            </button>
            <button
              onClick={() => setAiToolTab('quickReplies')}
              className={`flex-1 py-2 text-sm font-medium flex items-center justify-center space-x-1 ${
                aiToolTab === 'quickReplies'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Quick Replies</span>
            </button>
            <button
              onClick={() => setAiToolTab('status')}
              className={`flex-1 py-2 text-sm font-medium flex items-center justify-center space-x-1 ${
                aiToolTab === 'status'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Status</span>
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {aiToolTab === 'summary' && (
              <ChatSummary 
                contact={contact}
                messages={messages}
              />
            )}
            
            {aiToolTab === 'quickReplies' && (
              <QuickReplies 
                onSelectReply={onQuickReplySelect}
              />
            )}
            
            {aiToolTab === 'status' && (
              <StatusUpdate 
                currentStatus={contact.status}
                onStatusChange={handleStatusUpdate}
                onNoteSubmit={onNoteSubmit}
              />
            )}
          </div>
        </div>
      )}
      
      {/* Profile Info */}
      {contact && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  contact.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
                <span className="text-xs text-gray-500">
                  {contact.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex space-x-2">
            <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Assign To
            </button>
            <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Go to CRM
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIToolsPanel;
