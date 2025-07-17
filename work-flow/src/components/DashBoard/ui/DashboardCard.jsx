import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const DashboardCard = ({ title, subtitle, dropdownLabel, children }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {dropdownLabel && (
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <span className="text-sm text-gray-500">{dropdownLabel}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  dropdownLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default DashboardCard;