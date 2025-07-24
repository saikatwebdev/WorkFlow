import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';

const ProfileSidebar = ({ contact }) => {
  if (!contact) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">Select a conversation to view contact details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-20 h-20 rounded-full object-cover mx-auto"
          />
          {contact.isOnline && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {contact.name}
        </h3>
        
        <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{contact.location}</span>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
          <MessageCircle className="w-4 h-4" />
          <span>Say Hi</span>
        </button>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">About</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {contact.bio}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Sales Intent</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              {contact.intent}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Status</h4>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            contact.isOnline 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              contact.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            {contact.isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
