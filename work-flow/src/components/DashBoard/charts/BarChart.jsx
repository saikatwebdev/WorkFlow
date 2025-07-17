import React from 'react';
import PropTypes from 'prop-types';

const BarChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.revenue)));
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-sm text-gray-600">Sales</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm text-gray-600">Revenue</span>
        </div>
      </div>
      <div className="flex items-end justify-between space-x-2 sm:space-x-3 h-48 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 group flex-1">
            <div className="flex items-end space-x-1 h-full">
              <div 
                className="w-3 sm:w-4 bg-blue-500 rounded-t-md transition-all duration-500 ease-out transform group-hover:bg-blue-600"
                style={{ height: `${(item.sales / maxValue) * 100}%` }}
              ></div>
              <div 
                className="w-3 sm:w-4 bg-green-500 rounded-t-md transition-all duration-500 ease-out transform group-hover:bg-green-600"
                style={{ height: `${(item.revenue / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 transition-colors group-hover:text-gray-800 font-medium">
              {item.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
  })).isRequired,
};

export default BarChart;