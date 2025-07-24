import React, { useState } from 'react';
import { Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { quickReplies } from './dummyData';

const QuickReplies = ({ onSelectReply, isVisible, onToggle }) => {
  const [selectedReply, setSelectedReply] = useState(null);

  const handleReplySelect = (reply) => {
    setSelectedReply(reply.id);
    onSelectReply(reply.message);
    // Reset selection after a brief moment
    setTimeout(() => setSelectedReply(null), 300);
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Zap size={16} />
        Quick Replies
        <ChevronUp size={14} />
      </button>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-3">
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Quick Replies</span>
        </div>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronDown size={16} />
        </button>
      </div>
      
      <div className="p-2 max-h-48 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply.id}
              onClick={() => handleReplySelect(reply)}
              className={`p-2 text-left text-sm rounded-lg border transition-all ${
                selectedReply === reply.id
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200'
              }`}
            >
              <div className="font-medium mb-1">{reply.title}</div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {reply.message.substring(0, 60)}...
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickReplies;
