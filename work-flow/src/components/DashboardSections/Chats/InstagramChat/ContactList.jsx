import React from 'react';
import { Search } from 'lucide-react';

const ContactList = ({
  contacts,
  selectedContact,
  searchQuery,
  statusFilter,
  onSelectContact,
  onSearchChange,
  onFilterChange,
}) => {
  const statusFilters = [
    { id: 'all', label: 'All', color: 'purple' },
    { id: 'active', label: 'Active', color: 'green' },
    { id: 'pending', label: 'Pending', color: 'yellow' },
    { id: 'assigned', label: 'Assigned', color: 'blue' },
    { id: 'closed', label: 'Closed', color: 'gray' },
  ];

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
      </div>
      
      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        {/* Status Filters */}
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-1">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                statusFilter === filter.id
                  ? `bg-${filter.color}-100 text-${filter.color}-700`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedContact?.id === contact.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {contact.lastMessage}
                </p>
                {contact.unreadCount > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contact.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
