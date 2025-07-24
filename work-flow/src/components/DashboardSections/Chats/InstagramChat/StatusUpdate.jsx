import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, X, UserPlus, ArrowRight } from 'lucide-react';

const statusOptions = [
  {
    id: 'new',
    label: 'New',
    icon: <UserPlus className="w-4 h-4" />,
    color: 'bg-blue-100 text-blue-800',
    hoverColor: 'bg-blue-200',
    description: 'New customer inquiry',
  },
  {
    id: 'contacted',
    label: 'Contacted',
    icon: <Clock className="w-4 h-4" />,
    color: 'bg-yellow-100 text-yellow-800',
    hoverColor: 'bg-yellow-200',
    description: 'Initial contact made',
  },
  {
    id: 'qualified',
    label: 'Qualified',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'bg-green-100 text-green-800',
    hoverColor: 'bg-green-200',
    description: 'Lead qualified for sales',
  },
  {
    id: 'unqualified',
    label: 'Unqualified',
    icon: <X className="w-4 h-4" />,
    color: 'bg-red-100 text-red-800',
    hoverColor: 'bg-red-200',
    description: 'Not a good fit',
  },
  {
    id: 'proposal',
    label: 'Proposal Sent',
    icon: <ArrowRight className="w-4 h-4" />,
    color: 'bg-purple-100 text-purple-800',
    hoverColor: 'bg-purple-200',
    description: 'Proposal shared with customer',
  },
];

const StatusUpdate = ({ currentStatus = '', onStatusChange, onNoteSubmit }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStatus) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onStatusChange) onStatusChange(selectedStatus);
      if (onNoteSubmit && note.trim()) onNoteSubmit(note);
      setNote('');
      setIsSubmitting(false);
    }, 500);
  };

  const currentStatusData = statusOptions.find(s => s.id === selectedStatus) || {};

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-blue-100 rounded-lg">
          <AlertCircle className="w-4 h-4 text-blue-600" />
        </div>
        <h4 className="text-sm font-medium text-gray-900">Update Status</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <h5 className="text-xs font-medium text-gray-500 mb-2">SELECT STATUS</h5>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                type="button"
                onClick={() => setSelectedStatus(status.id)}
                className={`flex items-center space-x-2 p-2 text-sm rounded-lg border transition-colors ${
                  selectedStatus === status.id
                    ? `${status.color} border-transparent`
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className={selectedStatus === status.id ? 'text-current' : 'text-gray-500'}>
                  {status.icon}
                </span>
                <span>{status.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {selectedStatus && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <div className={`flex-shrink-0 p-1.5 rounded-full ${currentStatusData.color}`}>
                {currentStatusData.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{currentStatusData.label}</p>
                <p className="text-xs text-gray-500">{currentStatusData.description}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="status-note" className="block text-xs font-medium text-gray-500 mb-1">
              ADD NOTE (OPTIONAL)
            </label>
            <textarea
              id="status-note"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about this status change..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={!selectedStatus || isSubmitting}
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg ${
              selectedStatus && !isSubmitting
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-300 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors`}
          >
            {isSubmitting ? 'Updating...' : 'Update Status'}
          </button>
        </form>
        
        <div className="pt-2">
          <p className="text-xs text-gray-500">
            Status updates help your team track the progress of customer interactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdate;
