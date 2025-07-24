import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, MessageSquare, Phone, Mail, MoreVertical, Paperclip, Smile, Send } from 'lucide-react';
import ContactList from './ContactList';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import AIToolsPanel from './AIToolsPanel';
import { contacts as dummyContacts, messages as dummyMessages } from './dummyData';

const InstagramChat = () => {
  // State for contacts and messages
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  
  // UI State
  const [showAITools, setShowAITools] = useState(true);
  const [aiToolTab, setAiToolTab] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showMobileAISidebar, setShowMobileAISidebar] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Filter contacts based on search query and status
  const filteredContacts = dummyContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Auto-select first contact on initial load
  useEffect(() => {
    if (filteredContacts.length > 0 && !selectedContact) {
      setSelectedContact(filteredContacts[0]);
    }
  }, [filteredContacts]);

  // Load messages when selected contact changes
  useEffect(() => {
    if (selectedContact) {
      setMessages(dummyMessages[selectedContact.id] || []);
    }
  }, [selectedContact]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = useCallback((text) => {
    if (!text.trim() || !selectedContact) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Clear input
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    
    // Simulate reply after a short delay
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! We\'ll get back to you soon.',
        sender: selectedContact.id,
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prev => [...prev, reply]);
    }, 1000);
  }, [selectedContact]);

  // Handle quick reply selection
  const handleQuickReplySelect = useCallback((reply) => {
    if (inputRef.current) {
      inputRef.current.value = reply;
      inputRef.current.focus();
    }
  }, []);

  // Handle status update
  const handleStatusUpdate = useCallback((status) => {
    if (!selectedContact) return;
    
    // In a real app, this would update the contact's status in your backend
    console.log(`Updating status for ${selectedContact.name} to:`, status);
    
    // Update local state
    setSelectedContact(prev => ({
      ...prev,
      status: status
    }));
    
    // Also update the status in the contacts list
    setFilteredContacts(prev => 
      prev.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, status: status } 
          : contact
      )
    );
  }, [selectedContact]);

  // Handle note submission
  const handleNoteSubmit = useCallback((note) => {
    if (!selectedContact) return;
    
    // In a real app, this would save the note to your backend
    console.log(`Adding note to ${selectedContact.name}:`, note);
  }, [selectedContact]);

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setShowMobileSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-full shadow-lg"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Mobile AI Panel Toggle */}
      {selectedContact && (
        <button 
          onClick={() => setShowMobileAISidebar(true)}
          className="md:hidden fixed top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg"
        >
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      )}
      
      {/* Left Sidebar - Contact List */}
      <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-white transform ${
        showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <button 
            onClick={() => setShowMobileSidebar(false)}
            className="md:hidden p-1 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <ContactList
          contacts={filteredContacts}
          selectedContact={selectedContact}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSelectContact={(contact) => {
            setSelectedContact(contact);
            setShowMobileSidebar(false);
          }}
          onSearchChange={setSearchQuery}
          onFilterChange={setStatusFilter}
        />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white relative">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <ChatHeader 
              contact={selectedContact}
              onBack={() => setShowMobileSidebar(true)}
              onMenuClick={() => setShowMobileAISidebar(!showMobileAISidebar)}
            />
            
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {messages.map(message => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isMe={message.sender === 'me'}
                    showTime={true}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <MessageInput
                ref={inputRef}
                onSend={handleSendMessage}
                placeholder="Message..."
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
            <p className="text-sm text-gray-500 max-w-xs">Select a conversation from the sidebar or start a new one</p>
          </div>
        )}
      </div>
      
      {/* Right Sidebar - AI Tools */}
      {showAITools && (
        <div className={`fixed inset-y-0 right-0 z-30 w-80 bg-white transform ${
          showMobileAISidebar ? 'translate-x-0' : 'translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out border-l border-gray-200 flex flex-col`}>
          <AIToolsPanel 
            contact={selectedContact}
            messages={messages}
            onQuickReplySelect={handleQuickReplySelect}
            onStatusUpdate={handleStatusUpdate}
            onNoteSubmit={handleNoteSubmit}
            defaultTab={aiToolTab}
            onTabChange={setAiToolTab}
            isExpanded={showAITools}
            onToggleExpand={setShowAITools}
          />
          
          {/* Close button for mobile */}
          <button 
            onClick={() => setShowMobileAISidebar(false)}
            className="md:hidden absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Overlay for mobile */}
      {(showMobileSidebar || showMobileAISidebar) && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => {
            setShowMobileSidebar(false);
            setShowMobileAISidebar(false);
          }}
        />
      )}
    </div>
  );
};

export default InstagramChat;
