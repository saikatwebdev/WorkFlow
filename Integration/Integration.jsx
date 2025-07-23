import React from 'react';
import { Link, Plus, Search, Filter, X, MessageSquare, Tag, Users, Bell } from 'lucide-react';

// Import components and state hook
import { useIntegrationState } from './useIntegrationState';
import ToastNotification from './ToastNotification';
import ConnectAccountModal from './ConnectAccountModal';
import DisconnectModal from './DisconnectModal';
import DeleteAutomationModal from './DeleteAutomationModal';
import ConnectedAccountCard from './ConnectedAccountCard';
import AutomationCard from './AutomationCard';

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

const Integration = () => {
  const {
    activeTab, setActiveTab,
    showCreateModal, setShowCreateModal,
    showEditModal, setShowEditModal,
    editingAutomation, setEditingAutomation,
    showConnectModal, setShowConnectModal,
    showDisconnectModal, setShowDisconnectModal,
    selectedPlatform, setSelectedPlatform,
    selectedTrigger, setSelectedTrigger,
    selectedAction, setSelectedAction,
    filterStatus, setFilterStatus,
    searchTerm, setSearchTerm,
    disconnectAccount, setDisconnectAccount,
    showToast, setShowToast,
    toastMessage, setToastMessage,
    toastType, setToastType,
    showDropdown, setShowDropdown,
    showDeleteModal, setShowDeleteModal,
    deleteAutomation, setDeleteAutomation,
    connectedAccounts, setConnectedAccounts,
    automations, setAutomations
  } = useIntegrationState();

  // Business logic functions
  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const connectAccount = (account) => {
    if (account) {
      const newAccount = {
        id: Date.now(),
        platform: account.platform,
        username: account.username,
        connected: true,
        avatar: account.avatar
      };
      setConnectedAccounts(prev => [...prev, newAccount]);
      showNotification(`Successfully connected ${account.platform} account!`);
      setShowConnectModal(false);
    }
  };

  const handleDisconnect = (accountId) => {
    const account = connectedAccounts.find(acc => acc.id === accountId);
    setDisconnectAccount(account);
    setShowDisconnectModal(true);
  };

  const confirmDisconnect = () => {
    if (disconnectAccount) {
      setConnectedAccounts(prev => prev.filter(acc => acc.id !== disconnectAccount.id));
      showNotification(`${disconnectAccount.platform} account disconnected`, 'info');
      setShowDisconnectModal(false);
      setDisconnectAccount(null);
    }
  };

  const toggleAutomationStatus = (automationId) => {
    setAutomations(prev => prev.map(automation => {
      if (automation.id === automationId) {
        const newStatus = automation.status === 'active' ? 'paused' : 'active';
        showNotification(`Automation ${newStatus}`, 'info');
        return { ...automation, status: newStatus };
      }
      return automation;
    }));
  };

  const copyAutomation = (automationId) => {
    const automation = automations.find(a => a.id === automationId);
    if (automation) {
      const newAutomation = {
        ...automation,
        id: Date.now(),
        name: `${automation.name} (Copy)`,
        status: 'draft',
        created: new Date().toISOString().split('T')[0],
        lastRun: 'Never',
        runs: 0
      };
      setAutomations(prev => [...prev, newAutomation]);
      showNotification('Automation copied successfully!');
    }
  };

  const handleDeleteAutomation = (automationId) => {
    const automation = automations.find(a => a.id === automationId);
    setDeleteAutomation(automation);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteAutomation) {
      setAutomations(prev => prev.filter(a => a.id !== deleteAutomation.id));
      showNotification('Automation deleted successfully!', 'info');
      setShowDeleteModal(false);
      setDeleteAutomation(null);
    }
  };

  const handleEditAutomation = (automationId) => {
    const automation = automations.find(a => a.id === automationId);
    if (automation) {
      setEditingAutomation(automation);
      
      // Set the form values based on the automation data
      const platformId = getPlatformId(automation.platform);
      const triggerId = getTriggerId(automation.trigger);
      const actionId = getActionId(automation.action);
      
      setSelectedPlatform(platformId);
      setSelectedTrigger(triggerId);
      setSelectedAction(actionId);
      setShowEditModal(true);
    }
  };

  // Helper functions to get IDs from names
  const getPlatformId = (platformName) => {
    const platforms = {
      'Instagram': 'instagram',
      'WhatsApp': 'whatsapp',
      'Facebook': 'facebook'
    };
    return platforms[platformName] || 'instagram';
  };

  const getTriggerId = (triggerName) => {
    const triggers = {
      'New Follower': 'new_follower',
      'Comment Received': 'comment_received',
      'Story View': 'story_view',
      'DM Received': 'dm_received',
      'Message Received': 'message_received',
      'Keyword Detected': 'keyword_detected',
      'Contact Added': 'contact_added',
      'Page Message': 'page_message',
      'Post Comment': 'post_comment',
      'Page Like': 'page_like'
    };
    return triggers[triggerName] || 'new_follower';
  };

  const getActionId = (actionName) => {
    const actions = {
      'Send DM': 'send_dm',
      'Auto Reply': 'auto_reply',
      'Add Tag': 'add_tag',
      'Add to List': 'add_to_list',
      'Send Notification': 'send_notification'
    };
    return actions[actionName] || 'send_dm';
  };

  const createAutomation = () => {
    if (!selectedPlatform || !selectedTrigger || !selectedAction) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Helper function to get platform info
    const getPlatformInfo = (platformId) => {
      const platforms = {
        instagram: { name: 'Instagram', color: 'from-purple-500 to-pink-500' },
        whatsapp: { name: 'WhatsApp', color: 'from-green-500 to-green-600' },
        facebook: { name: 'Facebook', color: 'from-blue-500 to-blue-600' }
      };
      return platforms[platformId] || { name: platformId, color: 'from-gray-500 to-gray-600' };
    };

    // Helper function to get trigger name
    const getTriggerName = (platformId, triggerId) => {
      const triggers = {
        instagram: {
          'new_follower': 'New Follower',
          'comment_received': 'Comment Received',
          'story_view': 'Story View',
          'dm_received': 'DM Received'
        },
        whatsapp: {
          'message_received': 'Message Received',
          'keyword_detected': 'Keyword Detected',
          'contact_added': 'Contact Added'
        },
        facebook: {
          'page_message': 'Page Message',
          'post_comment': 'Post Comment',
          'page_like': 'Page Like'
        }
      };
      return triggers[platformId]?.[triggerId] || triggerId;
    };

    // Helper function to get action name
    const getActionName = (actionId) => {
      const actions = {
        'send_dm': 'Send DM',
        'auto_reply': 'Auto Reply',
        'add_tag': 'Add Tag',
        'add_to_list': 'Add to List',
        'send_notification': 'Send Notification'
      };
      return actions[actionId] || actionId;
    };

    const platformInfo = getPlatformInfo(selectedPlatform);
    const triggerName = getTriggerName(selectedPlatform, selectedTrigger);
    const actionName = getActionName(selectedAction);

    if (editingAutomation) {
      // Update existing automation
      const updatedAutomation = {
        ...editingAutomation,
        name: `${triggerName} → ${actionName}`,
        platform: platformInfo.name,
        trigger: triggerName,
        action: actionName
      };

      setAutomations(prev => prev.map(automation => 
        automation.id === editingAutomation.id ? updatedAutomation : automation
      ));
      showNotification('Automation updated successfully!');
      setShowEditModal(false);
      setEditingAutomation(null);
    } else {
      // Create new automation
      const newAutomation = {
        id: Date.now(),
        name: `${triggerName} → ${actionName}`,
        platform: platformInfo.name,
        trigger: triggerName,
        action: actionName,
        status: 'active',
        created: new Date().toISOString().split('T')[0],
        lastRun: 'Never',
        runs: 0
      };

      setAutomations(prev => [...prev, newAutomation]);
      showNotification('Automation created successfully!');
      setShowCreateModal(false);
    }
    
    // Reset form
    setSelectedPlatform('');
    setSelectedTrigger('');
    setSelectedAction('');
  };

  // Filter automations based on search term and status
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || automation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // CreateAutomationModal component that handles both create and edit
  const CreateAutomationModal = ({ isEdit = false }) => {
    const isVisible = isEdit ? showEditModal : showCreateModal;
    
    const platforms = [
      { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
      { id: 'whatsapp', name: 'WhatsApp', icon: WhatsAppIcon, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
      { id: 'facebook', name: 'Facebook', icon: FacebookIcon, color: 'bg-gradient-to-r from-blue-500 to-blue-600' }
    ];

    const triggers = {
      instagram: [
        { id: 'new_follower', name: 'New Follower', description: 'When someone follows your account' },
        { id: 'comment_received', name: 'Comment Received', description: 'When someone comments on your post' },
        { id: 'story_view', name: 'Story View', description: 'When someone views your story' },
        { id: 'dm_received', name: 'DM Received', description: 'When you receive a direct message' }
      ],
      whatsapp: [
        { id: 'message_received', name: 'Message Received', description: 'When you receive a message' },
        { id: 'keyword_detected', name: 'Keyword Detected', description: 'When specific keywords are mentioned' },
        { id: 'contact_added', name: 'Contact Added', description: 'When a new contact is added' }
      ],
      facebook: [
        { id: 'page_message', name: 'Page Message', description: 'When someone messages your page' },
        { id: 'post_comment', name: 'Post Comment', description: 'When someone comments on your post' },
        { id: 'page_like', name: 'Page Like', description: 'When someone likes your page' }
      ]
    };

    const actions = [
      { id: 'send_dm', name: 'Send DM', description: 'Send a direct message', icon: MessageSquare },
      { id: 'auto_reply', name: 'Auto Reply', description: 'Reply to comment/message', icon: MessageSquare },
      { id: 'add_tag', name: 'Add Tag', description: 'Tag the contact', icon: Tag },
      { id: 'add_to_list', name: 'Add to List', description: 'Add to contact list', icon: Users },
      { id: 'send_notification', name: 'Send Notification', description: 'Send notification to team', icon: Bell }
    ];

    const handleClose = () => {
      if (isEdit) {
        setShowEditModal(false);
        setEditingAutomation(null);
      } else {
        setShowCreateModal(false);
      }
      // Reset form
      setSelectedPlatform('');
      setSelectedTrigger('');
      setSelectedAction('');
    };

    if (!isVisible) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 animate-in zoom-in-95">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {isEdit ? 'Edit Automation' : 'Create New Automation'}
            </h2>
            <button 
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Platform Selection */}
            <div>
              <label className="block text-lg font-semibold text-slate-700 mb-4">Choose Platform</label>
              <div className="grid grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedPlatform === platform.id 
                        ? 'border-blue-500 bg-blue-50 scale-105' 
                        : 'border-slate-200 hover:border-slate-300 hover:scale-102'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className={`w-12 h-12 rounded-xl ${platform.color} flex items-center justify-center shadow-lg`}>
                        <platform.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-semibold text-slate-900">{platform.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Selection */}
            {selectedPlatform && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <label className="block text-lg font-semibold text-slate-700 mb-4">Define Trigger</label>
                <div className="space-y-3">
                  {triggers[selectedPlatform]?.map((trigger) => (
                    <button
                      key={trigger.id}
                      onClick={() => setSelectedTrigger(trigger.id)}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                        selectedTrigger === trigger.id 
                          ? 'border-blue-500 bg-blue-50 scale-102' 
                          : 'border-slate-200 hover:border-slate-300 hover:scale-101'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 text-lg">{trigger.name}</div>
                      <div className="text-slate-500 mt-1">{trigger.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Selection */}
            {selectedTrigger && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <label className="block text-lg font-semibold text-slate-700 mb-4">Set Action</label>
                <div className="space-y-3">
                  {actions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => setSelectedAction(action.id)}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                        selectedAction === action.id 
                          ? 'border-blue-500 bg-blue-50 scale-102' 
                          : 'border-slate-200 hover:border-slate-300 hover:scale-101'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                          <action.icon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-lg">{action.name}</div>
                          <div className="text-slate-500 mt-1">{action.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule & Conditions */}
            {selectedAction && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-4">Schedule</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-500 mb-2">Start Time</label>
                      <input
                        type="time"
                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-500 mb-2">End Time</label>
                      <input
                        type="time"
                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-4">Conditions</label>
                  <textarea
                    placeholder="Add any conditions or keywords..."
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                    rows="4"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleClose}
                className="px-6 py-3 text-slate-600 hover:text-slate-800 font-semibold transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={createAutomation}
                disabled={!selectedPlatform || !selectedTrigger || !selectedAction}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isEdit ? 'Update Automation' : 'Create Automation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Automation Manager
          </h1>
          <p className="text-slate-600 mt-3 text-lg">Create and manage your social media automation workflows</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`pb-4 px-2 border-b-2 font-semibold text-lg transition-all duration-300 ${
                activeTab === 'accounts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Connected Accounts
            </button>
            <button
              onClick={() => setActiveTab('automations')}
              className={`pb-4 px-2 border-b-2 font-semibold text-lg transition-all duration-300 ${
                activeTab === 'automations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Automations
            </button>
          </nav>
        </div>

        {/* Connected Accounts Tab */}
        {activeTab === 'accounts' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Social Media Accounts</h2>
              <button 
                onClick={() => setShowConnectModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center space-x-3 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
              >
                <Link className="w-5 h-5" />
                <span>Connect Account</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedAccounts.map((account, index) => (
                <div key={account.id} className={`animate-in slide-in-from-bottom-4 duration-500`} style={{animationDelay: `${index * 100}ms`}}>
                  <ConnectedAccountCard 
                    account={account} 
                    handleDisconnect={handleDisconnect} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Automations Tab */}
        {activeTab === 'automations' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Automation Workflows</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center space-x-3 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
              >
                <Plus className="w-5 h-5" />
                <span>Create Automation</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search automations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all duration-300"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-slate-400" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Automation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAutomations.map((automation, index) => (
                <div key={automation.id} className={`animate-in slide-in-from-bottom-4 duration-500`} style={{animationDelay: `${index * 100}ms`}}>
                  <AutomationCard 
                    automation={automation}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    toggleAutomationStatus={toggleAutomationStatus}
                    copyAutomation={copyAutomation}
                    handleDeleteAutomation={handleDeleteAutomation}
                    handleEditAutomation={handleEditAutomation}
                  />
                </div>
              ))}
              {filteredAutomations.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="text-slate-400 mb-6">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">No automations found</h3>
                  <p className="text-slate-500 text-lg">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Automation Modal */}
        <CreateAutomationModal isEdit={false} />

        {/* Edit Automation Modal */}
        <CreateAutomationModal isEdit={true} />

        {/* Connect Account Modal */}
        <ConnectAccountModal 
          showConnectModal={showConnectModal}
          setShowConnectModal={setShowConnectModal}
          connectAccount={connectAccount}
        />

        {/* Disconnect Confirmation Modal */}
        <DisconnectModal 
          showDisconnectModal={showDisconnectModal}
          setShowDisconnectModal={setShowDisconnectModal}
          disconnectAccount={disconnectAccount}
          confirmDisconnect={confirmDisconnect}
        />

        {/* Delete Confirmation Modal */}
        <DeleteAutomationModal 
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteAutomation={deleteAutomation}
          confirmDelete={confirmDelete}
        />

        {/* Toast Notification */}
        <ToastNotification 
          showToast={showToast}
          toastMessage={toastMessage}
          toastType={toastType}
        />
      </main>
    </div>
  );
};

export default Integration;