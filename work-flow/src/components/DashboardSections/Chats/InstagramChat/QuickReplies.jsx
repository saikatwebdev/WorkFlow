import React, { useState } from 'react';
import { Zap, Plus, X } from 'lucide-react';
import { quickReplies as defaultQuickReplies } from './dummyData';

const QuickReplies = ({ onSelectReply }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [quickReplies, setQuickReplies] = useState(defaultQuickReplies);
  const [activeCategory, setActiveCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(quickReplies.map(qr => qr.category))];
  
  // Filter quick replies by active category
  const filteredReplies = activeCategory === 'All' 
    ? quickReplies 
    : quickReplies.filter(qr => qr.category === activeCategory);

  const handleAddReply = (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    
    const newQuickReply = {
      id: `qr${Date.now()}`,
      text: newReply,
      category: 'Custom'
    };
    
    setQuickReplies([...quickReplies, newQuickReply]);
    setNewReply('');
    setIsAdding(false);
  };

  const handleDeleteReply = (id, e) => {
    e.stopPropagation();
    setQuickReplies(quickReplies.filter(qr => qr.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <h4 className="text-sm font-medium text-gray-900">Quick Replies</h4>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 text-gray-400 hover:text-gray-600"
          title="Add new quick reply"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* Add New Quick Reply Form */}
      {isAdding && (
        <form onSubmit={handleAddReply} className="mb-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Type a quick reply..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
        </form>
      )}
      
      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
              activeCategory === category
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Quick Replies List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {filteredReplies.length > 0 ? (
          filteredReplies.map(reply => (
            <div 
              key={reply.id}
              onClick={() => onSelectReply(reply.text)}
              className="group relative p-3 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-purple-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <p className="text-gray-800">{reply.text}</p>
                <button
                  onClick={(e) => handleDeleteReply(reply.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 -mt-1 -mr-1"
                  title="Delete quick reply"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              {reply.category && reply.category !== 'All' && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs text-gray-500 bg-gray-100 rounded-full">
                  {reply.category}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">
            No quick replies found in this category.
          </div>
        )}
      </div>
      
      <div className="pt-2">
        <p className="text-xs text-gray-500">
          Click on a quick reply to insert it into the chat.
        </p>
      </div>
    </div>
  );
};

export default QuickReplies;
