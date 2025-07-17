import React from 'react';
import { Link, Plus, Search, Filter } from 'lucide-react';

// Import components and state hook only
import { useIntegrationState } from './useIntegrationState';
import ToastNotification from './ToastNotification';
import ConnectAccountModal from './ConnectAccountModal';
import DisconnectModal from './DisconnectModal';
import DeleteAutomationModal from './DeleteAutomationModal';
import ConnectedAccountCard from './ConnectedAccountCard';
import AutomationCard from './AutomationCard';

const Integration = () => {
  const {
    activeTab, setActiveTab,
    showCreateModal, setShowCreateModal,
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

  // Business logic functions defined inline
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

  // Filter automations based on search term and status
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || automation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Original CreateAutomationModal component (unchanged)
  const CreateAutomationModal = () => {
    const platforms = [
      { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
      { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', color: 'bg-green-500' },
      { id: 'facebook', name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600' }
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
      { id: 'send_dm', name: 'Send DM', description: 'Send a direct message', icon: 'MessageSquare' },
      { id: 'auto_reply', name: 'Auto Reply', description: 'Reply to comment/message', icon: 'MessageCircle' },
      { id: 'add_tag', name: 'Add Tag', description: 'Tag the contact', icon: 'Tag' },
      { id: 'add_to_list', name: 'Add to List', description: 'Add to contact list', icon: 'Users' },
      { id: 'send_notification', name: 'Send Notification', description: 'Send notification to team', icon: 'Bell' }
    ];

    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Create New Automation</h2>
            <button 
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Choose Platform</label>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPlatform === platform.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 rounded-lg ${platform.color} flex items-center justify-center`}>
                        <span className="text-white text-sm font-medium">{platform.icon[0]}</span>
                      </div>
                      <span className="text-sm font-medium">{platform.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Selection */}
            {selectedPlatform && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Define Trigger</label>
                <div className="space-y-2">
                  {triggers[selectedPlatform]?.map((trigger) => (
                    <button
                      key={trigger.id}
                      onClick={() => setSelectedTrigger(trigger.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedTrigger === trigger.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{trigger.name}</div>
                      <div className="text-sm text-gray-500">{trigger.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Selection */}
            {selectedTrigger && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Set Action</label>
                <div className="space-y-2">
                  {actions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => setSelectedAction(action.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedAction === action.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 text-gray-600 flex items-center justify-center">
                          <span className="text-sm">{action.icon[0]}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{action.name}</div>
                          <div className="text-sm text-gray-500">{action.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule & Conditions */}
            {selectedAction && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">End Time</label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Conditions</label>
                  <textarea
                    placeholder="Add any conditions or keywords..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!selectedPlatform || !selectedTrigger || !selectedAction}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Automation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Automation Manager</h1>
          <p className="text-gray-600 mt-2">Create and manage your social media automation workflows</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'accounts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Connected Accounts
            </button>
            <button
              onClick={() => setActiveTab('automations')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'automations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Automations
            </button>
          </nav>
        </div>

        {/* Connected Accounts Tab */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Social Media Accounts</h2>
              <button 
                onClick={() => setShowConnectModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
              >
                <Link className="w-4 h-4" />
                <span>Connect Account</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="opacity-100 transition-opacity duration-300">
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Automation Workflows</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Automation</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search automations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {filteredAutomations.map((automation) => (
                <div key={automation.id} className="opacity-100 transition-all duration-300">
                  <AutomationCard 
                    automation={automation}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    toggleAutomationStatus={toggleAutomationStatus}
                    copyAutomation={copyAutomation}
                    handleDeleteAutomation={handleDeleteAutomation}
                  />
                </div>
              ))}
              {filteredAutomations.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No automations found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Automation Modal */}
        {showCreateModal && <CreateAutomationModal />}

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