import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Filter, 
  Search, 
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  ChevronUp,
  ChevronDown,
  X,
  Check
} from 'lucide-react';
import * as XLSX from 'xlsx';

const SalesReport = () => {
  // Sample data - in production, this would come from an API
  const [salesData] = useState([
    { id: 1, date: '2024-01-15', product: 'Laptop Pro', category: 'Electronics', amount: 1299.99, quantity: 2, customer: 'John Doe', status: 'Completed' },
    { id: 2, date: '2024-01-16', product: 'Office Chair', category: 'Furniture', amount: 299.99, quantity: 5, customer: 'Jane Smith', status: 'Completed' },
    { id: 3, date: '2024-01-17', product: 'Wireless Mouse', category: 'Electronics', amount: 49.99, quantity: 10, customer: 'Bob Johnson', status: 'Pending' },
    { id: 4, date: '2024-01-18', product: 'Standing Desk', category: 'Furniture', amount: 599.99, quantity: 3, customer: 'Alice Brown', status: 'Completed' },
    { id: 5, date: '2024-01-19', product: 'USB-C Hub', category: 'Electronics', amount: 79.99, quantity: 8, customer: 'Charlie Wilson', status: 'Completed' },
    { id: 6, date: '2024-01-20', product: 'Ergonomic Keyboard', category: 'Electronics', amount: 129.99, quantity: 4, customer: 'Diana Prince', status: 'Completed' },
    { id: 7, date: '2024-01-21', product: 'Desk Lamp', category: 'Furniture', amount: 89.99, quantity: 6, customer: 'Edward Norton', status: 'Cancelled' },
    { id: 8, date: '2024-01-22', product: 'Monitor 4K', category: 'Electronics', amount: 499.99, quantity: 2, customer: 'Frank Castle', status: 'Completed' },
    { id: 9, date: '2024-01-23', product: 'Office Cabinet', category: 'Furniture', amount: 399.99, quantity: 1, customer: 'Grace Kelly', status: 'Completed' },
    { id: 10, date: '2024-01-24', product: 'Webcam HD', category: 'Electronics', amount: 99.99, quantity: 7, customer: 'Henry Ford', status: 'Pending' },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
    status: ''
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showFilters, setShowFilters] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Get unique categories for filter dropdown
  const categories = [...new Set(salesData.map(item => item.category))];
  const statuses = [...new Set(salesData.map(item => item.status))];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = salesData.filter(item => {
      // Search filter
      if (filters.search && !Object.values(item).some(val => 
        val.toString().toLowerCase().includes(filters.search.toLowerCase())
      )) return false;

      // Category filter
      if (filters.category && item.category !== filters.category) return false;

      // Status filter
      if (filters.status && item.status !== filters.status) return false;

      // Date filters
      if (filters.dateFrom && item.date < filters.dateFrom) return false;
      if (filters.dateTo && item.date > filters.dateTo) return false;

      // Amount filters
      if (filters.minAmount && item.amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && item.amount > parseFloat(filters.maxAmount)) return false;

      return true;
    });

    // Sort data
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        const comparison = aValue > bValue ? 1 : -1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [salesData, filters, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(current => ({ ...current, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
      status: ''
    });
  };

  // Export to Excel
  const exportToExcel = async () => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      // Prepare data for export
      const exportData = filteredAndSortedData.map(item => ({
        'Date': item.date,
        'Product': item.product,
        'Category': item.category,
        'Quantity': item.quantity,
        'Amount': `$${item.amount.toFixed(2)}`,
        'Customer': item.customer,
        'Status': item.status
      }));

      // Create workbook
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');

      // Style the header row (this is a simplified version)
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + '1';
        if (!ws[address]) continue;
        ws[address].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'CCCCCC' } }
        };
      }

      // Complete progress
      clearInterval(progressInterval);
      setExportProgress(100);

      // Download file
      setTimeout(() => {
        XLSX.writeFile(wb, `Sales_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
        setIsExporting(false);
        setExportProgress(0);
      }, 500);

    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const filtered = filteredAndSortedData;
    const total = filtered.reduce((sum, item) => sum + item.amount, 0);
    const totalQuantity = filtered.reduce((sum, item) => sum + item.quantity, 0);
    const avgOrder = filtered.length > 0 ? total / filtered.length : 0;

    return {
      totalSales: total,
      totalOrders: filtered.length,
      totalQuantity,
      avgOrderValue: avgOrder
    };
  }, [filteredAndSortedData]);

  // Get sort icon
  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="h-full w-full bg-gray-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sales & Reports</h2>
              <p className="text-gray-600 mt-1">Track and analyze your sales performance</p>
            </div>
            <button
              onClick={exportToExcel}
              disabled={isExporting || filteredAndSortedData.length === 0}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting... {exportProgress}%</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export to Excel</span>
                </>
              )}
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Sales</p>
                  <p className="text-2xl font-bold text-blue-900">${summaryStats.totalSales.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold text-green-900">{summaryStats.totalOrders}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Items Sold</p>
                  <p className="text-2xl font-bold text-purple-900">{summaryStats.totalQuantity}</p>
                </div>
                <Package className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Avg Order Value</p>
                  <p className="text-2xl font-bold text-orange-900">${summaryStats.avgOrderValue.toFixed(2)}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sales data..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {Object.values(filters).filter(v => v).length > 1 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                    {Object.values(filters).filter(v => v).length - (filters.search ? 1 : 0)}
                  </span>
                )}
              </button>
              {Object.values(filters).some(v => v) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                <input
                  type="number"
                  placeholder="$0"
                  value={filters.minAmount}
                  onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                <input
                  type="number"
                  placeholder="$999999"
                  value={filters.maxAmount}
                  onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="min-w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Date</span>
                      {getSortIcon('date')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('product')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Product</span>
                      {getSortIcon('product')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('category')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Category</span>
                      {getSortIcon('category')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('quantity')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Quantity</span>
                      {getSortIcon('quantity')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('amount')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Amount</span>
                      {getSortIcon('amount')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('customer')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Customer</span>
                      {getSortIcon('customer')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Status</span>
                      {getSortIcon('status')}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No sales data found</p>
                        <p className="text-sm mt-1">Try adjusting your filters or search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedData.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(sale.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                          {sale.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${sale.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          sale.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Progress Overlay */}
        {isExporting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - exportProgress / 100)}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {exportProgress === 100 ? (
                      <Check className="w-8 h-8 text-green-600" />
                    ) : (
                      <span className="text-lg font-semibold">{exportProgress}%</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-700 font-medium">
                {exportProgress === 100 ? 'Export Complete!' : 'Exporting to Excel...'}
              </p>
              <p className="text-center text-sm text-gray-500 mt-1">
                {exportProgress === 100 ? 'Your download will start shortly' : 'Please wait while we prepare your file'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReport;