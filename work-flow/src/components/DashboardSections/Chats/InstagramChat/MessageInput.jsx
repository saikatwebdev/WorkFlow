import React, { useRef, useEffect } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';

const MessageInput = ({
  value = '', // Add default empty string
  onChange,
  onSend,
  placeholder = 'Message...',
  disabled = false,
  inputRef = null,
}) => {
  const textareaRef = useRef(null);
  const inputRefToUse = inputRef || textareaRef;

  const handleKeyDown = (e) => {
    // Send message on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(e);
    }
    
    // Auto-resize textarea
    if (e.target) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  useEffect(() => {
    // Reset height when value changes
    if (inputRefToUse.current) {
      inputRefToUse.current.style.height = 'auto';
      inputRefToUse.current.style.height = `${inputRefToUse.current.scrollHeight}px`;
    }
  }, [value, inputRefToUse]);

  return (
    <form onSubmit={onSend} className="p-3 border-t border-gray-200 bg-white">
      <div className="flex items-end">
        <button 
          type="button" 
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.preventDefault();
            // Handle attachment click
          }}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <div className="flex-1 mx-2">
          <div className="relative">
            <textarea
              ref={inputRefToUse}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              disabled={disabled}
              className="w-full max-h-32 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white resize-none overflow-hidden"
              style={{ minHeight: '40px' }}
            />
            <button 
              type="button" 
              className="absolute right-2 bottom-2 p-1 text-gray-400 hover:text-gray-600"
              onClick={(e) => {
                e.preventDefault();
                // Handle emoji picker
              }}
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!(value || '').trim() || disabled} // Safe null check
          className={`p-2 rounded-full ${
            (value || '').trim() && !disabled // Safe null check
              ? 'text-purple-600 hover:text-purple-700'
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;