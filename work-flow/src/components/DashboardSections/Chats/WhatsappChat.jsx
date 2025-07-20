import React, { useState, useEffect } from 'react';
import ChatList from './whatsapp/ChatList';
import ChatWindow from './whatsapp/ChatWindow';
import ChatFilter from './whatsapp/ChatFilter';

function WhatsappChat() {
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', status: 'Active', lastMessageTime: new Date().getTime() - 3600000 },
    { id: 2, name: 'Sarah Wilson', lastMessage: 'Meeting tomorrow at 3?', time: '9:45 AM', status: 'Active', lastMessageTime: new Date().getTime() - 7200000 },
    { id: 3, name: 'Project Team', lastMessage: 'Draft is ready for review', time: 'Yesterday', status: 'Draft', lastMessageTime: new Date().getTime() - 86400000 },
    { id: 4, name: 'Client Support', lastMessage: 'Ticket has been resolved', time: 'Yesterday', status: 'Closed', lastMessageTime: new Date().getTime() - 90000000 },
    { id: 5, name: 'Alex Chen', lastMessage: 'Will get back to you soon', time: '2 days ago', status: 'Paused', lastMessageTime: new Date().getTime() - 172800000 },
    { id: 6, name: 'Design Review', lastMessage: 'Please check the mockups', time: '3 days ago', status: 'Assign to me', lastMessageTime: new Date().getTime() - 259200000 },
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [aiMode, setAiMode] = useState(false);

  // Handle status change from ChatWindow
  const handleStatusChange = (chatId, newStatus) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          status: newStatus
        };
      }
      return chat;
    });
    setChats(updatedChats);
    
    // Update activeChat if it's the one being changed
    if (activeChat && activeChat.id === chatId) {
      setActiveChat({
        ...activeChat,
        status: newStatus
      });
    }
  };

  // Simulate incoming client messages when AI mode is active
  useEffect(() => {
    if (aiMode && activeChat) {
      // Simulate a client message after 3 seconds
      const clientMessageTimer = setTimeout(() => {
        const clientMessages = [
          "Can you help me with my order?",
          "I need assistance with the product",
          "When will my delivery arrive?",
          "I have a question about pricing",
          "Is this item available in other colors?"
        ];
        
        const randomMessage = clientMessages[Math.floor(Math.random() * clientMessages.length)];
        const clientMessage = {
          id: messages.length + 1,
          sender: 'other',
          text: randomMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, clientMessage]);
        
        // Update chat's last message
        updateChatLastMessage(activeChat.id, randomMessage, clientMessage.time);
      }, 3000);

      return () => clearTimeout(clientMessageTimer);
    }
  }, [aiMode, activeChat, messages.length]);

  // Auto-reply to client messages when AI mode is active
  useEffect(() => {
    if (aiMode && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      // Only auto-reply to client messages (not our own)
      if (lastMessage.sender === 'other') {
        const aiReplyTimer = setTimeout(() => {
          const aiReplies = [
            "I understand your concern. Let me help you with that right away.",
            "Thank you for reaching out. I'm checking this for you now.",
            "I'll be happy to assist you with this request.",
            "Let me look into that for you. One moment please.",
            "I've received your message and I'm working on a solution."
          ];
          
          const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
          const aiMessage = {
            id: messages.length + 1,
            sender: 'me',
            text: randomReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          
          setMessages(prev => [...prev, aiMessage]);
          
          // Update chat's last message
          if (activeChat) {
            updateChatLastMessage(activeChat.id, randomReply, aiMessage.time);
          }
        }, 1500);

        return () => clearTimeout(aiReplyTimer);
      }
    }
  }, [messages, aiMode, activeChat]);

  // Update chat status when AI mode changes
  useEffect(() => {
    if (activeChat && aiMode) {
      handleStatusChange(activeChat.id, 'Assign to me');
    }
  }, [aiMode]);

  useEffect(() => {
    if (activeChat) {
      // Initialize with some messages for the active chat
      setMessages([
        { id: 1, sender: 'other', text: 'Hey there! How can I help you today?', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Hi! I need some assistance with my project.', time: '10:02 AM' },
      ]);
    }
  }, [activeChat]);

  const updateChatLastMessage = (chatId, message, time) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          lastMessage: message,
          time: time,
          lastMessageTime: new Date().getTime()
        };
      }
      return chat;
    });
    
    // Sort chats by lastMessageTime (most recent first)
    updatedChats.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    setChats(updatedChats);
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);

    // Update the chat's last message and move it to top
    if (activeChat) {
      updateChatLastMessage(activeChat.id, text, newMessage.time);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col h-full">
        {/* Header with Filters */}
        <ChatFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Chat List - Pass updated chats with current status */}
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      </div>

      {/* Chat Window */}
      <ChatWindow
        activeChat={activeChat ? { ...activeChat, status: chats.find(c => c.id === activeChat.id)?.status } : null}
        messages={messages}
        onSendMessage={handleSendMessage}
        aiMode={aiMode}
        onToggleAI={() => setAiMode(!aiMode)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default WhatsappChat;