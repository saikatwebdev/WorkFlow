import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp } from 'lucide-react';

const MetricCard = ({ icon: Icon, value, label, color, trend, index, isHovered, onMouseEnter, onMouseLeave }) => (
  <div 
    className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
      isHovered ? 'ring-2 ring-blue-300' : ''
    }`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500 mb-2">{label}</div>
        {trend && (
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-green-500">+{trend}%</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-lg transform transition-transform duration-300 ${
        isHovered ? 'rotate-12 scale-110' : ''
      }`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

MetricCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  trend: PropTypes.string,
  index: PropTypes.number.isRequired,
  isHovered: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default MetricCard;