import React from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 text-sm lg:text-base mt-1">{subtitle}</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
          <Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>
    </div>
  );
};

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default DashboardHeader;