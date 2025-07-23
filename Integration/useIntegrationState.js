import { useState, useEffect } from 'react';

export const useIntegrationState = () => {
  const [activeTab, setActiveTab] = useState('automations');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [disconnectAccount, setDisconnectAccount] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAutomation, setDeleteAutomation] = useState(null);

  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: 1, platform: 'Instagram', username: '@yourhandle', connected: true, avatar: '📸' },
    { id: 2, platform: 'WhatsApp', username: '+1234567890', connected: true, avatar: '💬' },
    { id: 3, platform: 'Facebook', username: 'Your Page', connected: true, avatar: '📘' },
  ]);

  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Welcome Message',
      platform: 'Instagram',
      trigger: 'New Follower',
      action: 'Send DM',
      status: 'active',
      created: '2024-01-15',
      lastRun: '2 hours ago',
      runs: 247
    },
    {
      id: 2,
      name: 'Comment Auto-Reply',
      platform: 'Instagram',
      trigger: 'Comment Received',
      action: 'Auto Reply',
      status: 'active',
      created: '2024-01-10',
      lastRun: '5 minutes ago',
      runs: 89
    },
    {
      id: 3,
      name: 'Lead Qualification',
      platform: 'WhatsApp',
      trigger: 'Message Received',
      action: 'Add Tag',
      status: 'paused',
      created: '2024-01-08',
      lastRun: '1 day ago',
      runs: 156
    },
    {
      id: 4,
      name: 'Story Engagement',
      platform: 'Instagram',
      trigger: 'Story View',
      action: 'Send DM',
      status: 'draft',
      created: '2024-01-12',
      lastRun: 'Never',
      runs: 0
    }
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.relative')) {
        setShowDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  return {
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
  };
};