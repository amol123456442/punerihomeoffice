import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Download, Send, CreditCard, Banknote,
  CheckCircle, Clock, AlertCircle, DollarSign, Calendar,
  Users, Home, MoreVertical, Eye, Receipt, ExternalLink,
  ChevronDown, ChevronUp, Plus, Mail, Phone, X, Edit,
  Trash2, FileText, Calculator, Wallet, TrendingUp,
  BanknoteArrowDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const OwnerPayments = () => {
  // State management
  const [payments, setPayments] = useState([
    {
      id: 1,
      ownerName: "Rajesh Sharma",
      property: "2 BHK Apartment, Hinjewadi",
      propertyId: "PROP001",
      amount: 45000,
      paymentDate: "2024-02-15",
      dueDate: "2024-02-10",
      status: "completed", // completed, pending, overdue, processing
      paymentMethod: "Bank Transfer",
      transactionId: "TXN789012",
      ownerEmail: "rajesh.sharma@email.com",
      ownerPhone: "+91 9876543210",
      cycle: "Monthly",
      notes: "Rent collection for February",
      attachments: 2
    },
    {
      id: 2,
      ownerName: "Priya Patel",
      property: "3 BHK Villa, Wakad",
      propertyId: "PROP002",
      amount: 75000,
      paymentDate: "2024-02-14",
      dueDate: "2024-02-10",
      status: "pending",
      paymentMethod: "Cheque",
      transactionId: "TXN789013",
      ownerEmail: "priya.patel@email.com",
      ownerPhone: "+91 9876543211",
      cycle: "Monthly",
      notes: "Awaiting cheque clearance",
      attachments: 1
    },
    {
      id: 3,
      ownerName: "Amit Singh",
      property: "4 BHK Penthouse, Baner",
      propertyId: "PROP003",
      amount: 125000,
      paymentDate: "2024-02-12",
      dueDate: "2024-02-05",
      status: "overdue",
      paymentMethod: "Bank Transfer",
      transactionId: "TXN789014",
      ownerEmail: "amit.singh@email.com",
      ownerPhone: "+91 9876543212",
      cycle: "Monthly",
      notes: "Follow up required",
      attachments: 0
    },
    {
      id: 4,
      ownerName: "Sneha Gupta",
      property: "2 BHK Apartment, Hinjewadi",
      propertyId: "PROP004",
      amount: 42000,
      paymentDate: "2024-02-10",
      dueDate: "2024-02-10",
      status: "completed",
      paymentMethod: "UPI",
      transactionId: "TXN789015",
      ownerEmail: "sneha.gupta@email.com",
      ownerPhone: "+91 9876543213",
      cycle: "Monthly",
      notes: "Rent collection",
      attachments: 3
    },
    {
      id: 5,
      ownerName: "Vikram Joshi",
      property: "1 BHK Studio, Kothrud",
      propertyId: "PROP005",
      amount: 28000,
      paymentDate: "2024-02-08",
      dueDate: "2024-02-05",
      status: "processing",
      paymentMethod: "Cash",
      transactionId: "TXN789016",
      ownerEmail: "vikram.joshi@email.com",
      ownerPhone: "+91 9876543214",
      cycle: "Monthly",
      notes: "Cash deposit pending",
      attachments: 1
    }
  ]);

  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // New payment form state
  const [newPayment, setNewPayment] = useState({
    ownerName: '',
    property: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    paymentMethod: 'Bank Transfer',
    cycle: 'Monthly',
    notes: ''
  });

  // Chart data
  const paymentTrendData = [
    { month: 'Jan', amount: 420000, count: 15 },
    { month: 'Feb', amount: 385000, count: 18 },
    { month: 'Mar', amount: 510000, count: 22 },
    { month: 'Apr', amount: 465000, count: 20 },
    { month: 'May', amount: 490000, count: 21 },
    { month: 'Jun', amount: 520000, count: 23 },
  ];

  const paymentStatusData = [
    { name: 'Completed', value: 65, color: '#10B981' },
    { name: 'Pending', value: 20, color: '#F59E0B' },
    { name: 'Overdue', value: 10, color: '#EF4444' },
    { name: 'Processing', value: 5, color: '#3B82F6' },
  ];

  const paymentMethodData = [
    { method: 'Bank Transfer', count: 45, amount: 1850000 },
    { method: 'UPI', count: 32, amount: 1250000 },
    { method: 'Cheque', count: 18, amount: 750000 },
    { method: 'Cash', count: 12, amount: 480000 },
    { method: 'Online', count: 28, amount: 1120000 },
  ];

  // Filter and search payments
  useEffect(() => {
    let result = [...payments];

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(payment => payment.status === statusFilter);
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const today = new Date();
      const lastWeek = new Date(today.setDate(today.getDate() - 7));
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

      result = result.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        switch(dateFilter) {
          case 'today': 
            return paymentDate.toDateString() === new Date().toDateString();
          case 'week':
            return paymentDate >= lastWeek;
          case 'month':
            return paymentDate >= lastMonth;
          default:
            return true;
        }
      });
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(payment =>
        payment.ownerName.toLowerCase().includes(term) ||
        payment.property.toLowerCase().includes(term) ||
        payment.propertyId.toLowerCase().includes(term)
      );
    }

    // Sort payments
    const sortFunctions = {
      newest: (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate),
      oldest: (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate),
      amountHigh: (a, b) => b.amount - a.amount,
      amountLow: (a, b) => a.amount - b.amount,
    };

    result.sort(sortFunctions[sortBy] || sortFunctions.newest);
    setFilteredPayments(result);
  }, [payments, statusFilter, dateFilter, searchTerm, sortBy]);

  // Statistics
  const stats = {
    totalPayments: payments.length,
    totalAmount: payments.reduce((sum, payment) => sum + payment.amount, 0),
    completedPayments: payments.filter(p => p.status === 'completed').length,
    pendingAmount: payments.filter(p => p.status === 'pending' || p.status === 'overdue')
      .reduce((sum, payment) => sum + payment.amount, 0),
  };

  // Status configuration
  const statusConfig = {
    completed: {
      color: 'bg-green-100 text-green-800 border border-green-200',
      icon: CheckCircle,
      label: 'Completed'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      icon: Clock,
      label: 'Pending'
    },
    overdue: {
      color: 'bg-red-100 text-red-800 border border-red-200',
      icon: AlertCircle,
      label: 'Overdue'
    },
    processing: {
      color: 'bg-blue-100 text-blue-800 border border-blue-200',
      icon: Clock,
      label: 'Processing'
    }
  };

  // Payment method configuration
  const paymentMethodConfig = {
    'Bank Transfer': { icon: BanknoteArrowDown, color: 'text-blue-600', bg: 'bg-blue-50' },
    'UPI': { icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    'Cheque': { icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
    'Cash': { icon: Banknote, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    'Online': { icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle payment actions
  const handleMarkAsCompleted = (id) => {
    setPayments(prev => prev.map(payment =>
      payment.id === id ? { ...payment, status: 'completed' } : payment
    ));
  };

  const handleSendReminder = (payment) => {
    alert(`Reminder sent to ${payment.ownerName} for payment of ${formatCurrency(payment.amount)}`);
  };

  const handleDownloadReceipt = (payment) => {
    alert(`Downloading receipt for ${payment.transactionId}`);
  };

  const handleDeletePayment = (id) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      setPayments(prev => prev.filter(payment => payment.id !== id));
      setSelectedPayment(null);
    }
  };

  const handleAddPayment = () => {
    if (!newPayment.ownerName || !newPayment.amount) {
      alert('Please fill in required fields');
      return;
    }

    const newPaymentObj = {
      id: payments.length + 1,
      ...newPayment,
      amount: parseInt(newPayment.amount),
      propertyId: `PROP00${payments.length + 1}`,
      transactionId: `TXN${Date.now().toString().slice(-6)}`,
      ownerEmail: `${newPayment.ownerName.toLowerCase().replace(' ', '.')}@email.com`,
      ownerPhone: '+91 9876543210',
      attachments: 0,
      status: 'pending'
    };

    setPayments(prev => [newPaymentObj, ...prev]);
    setShowPaymentModal(false);
    setNewPayment({
      ownerName: '',
      property: '',
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      paymentMethod: 'Bank Transfer',
      cycle: 'Monthly',
      notes: ''
    });
  };

  const handleSettleAmount = (paymentId, amount) => {
    // Here you would typically make an API call
    alert(`Settling ₹${amount} for payment ID: ${paymentId}`);
    setShowSettleModal(false);
  };

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'amount' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    const config = statusConfig[status];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <span className={`px-3 py-1.5 text-xs rounded-full flex items-center gap-1 ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // Render payment method badge
  const renderPaymentMethod = (method) => {
    const config = paymentMethodConfig[method];
    if (!config) return null;
    const Icon = config.icon;
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg}`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className="text-sm font-medium text-gray-700">{method}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Owner Payments</h1>
            <p className="text-xs text-gray-500">Manage payments and settlements</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-100"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-blue-600">Total</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(stats.totalAmount)}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">Completed</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mt-1">{stats.completedPayments}</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-yellow-600">Pending Amt</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(stats.pendingAmount)}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Receipt className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-purple-600">Total</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mt-1">{stats.totalPayments}</div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                <select
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Date</label>
                <select
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Mobile Layout */}
      <div className="lg:hidden">
        {selectedPayment ? (
          // Mobile Payment Detail View
          <div className="p-4">
            <button
              onClick={() => setSelectedPayment(null)}
              className="flex items-center gap-2 text-blue-600 mb-4"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
              Back to Payments
            </button>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              {/* Payment Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{selectedPayment.ownerName}</h3>
                  <p className="text-sm text-gray-600">{selectedPayment.property}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(selectedPayment.amount)}</div>
                  <div className="mt-1">{renderStatusBadge(selectedPayment.status)}</div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Payment Date</div>
                    <div className="text-sm font-medium">{formatDate(selectedPayment.paymentDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Due Date</div>
                    <div className="text-sm font-medium">{formatDate(selectedPayment.dueDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Cycle</div>
                    <div className="text-sm font-medium">{selectedPayment.cycle}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Transaction ID</div>
                    <div className="text-sm font-medium">{selectedPayment.transactionId}</div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <div className="text-xs text-gray-500 mb-2">Payment Method</div>
                  {renderPaymentMethod(selectedPayment.paymentMethod)}
                </div>

                {/* Owner Contact */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-2">Owner Contact</div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => window.location.href = `tel:${selectedPayment.ownerPhone}`}
                      className="flex items-center gap-2 text-blue-600"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{selectedPayment.ownerPhone}</span>
                    </button>
                    <button 
                      onClick={() => window.location.href = `mailto:${selectedPayment.ownerEmail}`}
                      className="flex items-center gap-2 text-blue-600"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </button>
                  </div>
                </div>

                {/* Notes */}
                {selectedPayment.notes && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Notes</div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{selectedPayment.notes}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
                  {selectedPayment.status !== 'completed' && (
                    <button
                      onClick={() => handleMarkAsCompleted(selectedPayment.id)}
                      className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg"
                    >
                      Mark as Paid
                    </button>
                  )}
                  <button
                    onClick={() => handleSendReminder(selectedPayment)}
                    className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
                  >
                    Send Reminder
                  </button>
                  <button
                    onClick={() => handleDownloadReceipt(selectedPayment)}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    Download Receipt
                  </button>
                  <button
                    onClick={() => handleDeletePayment(selectedPayment.id)}
                    className="px-4 py-2.5 bg-red-100 text-red-700 text-sm font-medium rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile Payment List
          <div className="p-2">
            {filteredPayments.length > 0 ? (
              <div className="space-y-2">
                {filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    onClick={() => setSelectedPayment(payment)}
                    className="bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{payment.ownerName}</h3>
                            <p className="text-sm text-gray-600">{payment.property}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-gray-900">
                              {formatCurrency(payment.amount)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(payment.paymentDate)}
                            </div>
                          </div>
                          {renderStatusBadge(payment.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Receipt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                <p className="text-gray-600 text-sm">
                  {searchTerm ? "Try adjusting your search" : "No payments recorded yet"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Owner Payments Management</h1>
            <p className="text-sm text-gray-600 mt-1">Track, manage, and settle owner payments efficiently</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-gray-600">Total Pending</div>
              <div className="text-sm font-semibold text-red-600">{formatCurrency(stats.pendingAmount)}</div>
            </div>
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Payment
            </button>
            <button className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.totalAmount)}</div>
            <div className="text-sm text-gray-600">Total Amount</div>
            <div className="text-xs text-green-600 mt-2">+12.5% from last month</div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <Receipt className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.completedPayments}</div>
            <div className="text-sm text-gray-600">Completed Payments</div>
            <div className="text-xs text-green-600 mt-2">85% success rate</div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.pendingAmount)}</div>
            <div className="text-sm text-gray-600">Pending Amount</div>
            <div className="text-xs text-red-600 mt-2">Requires attention</div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Home className="w-8 h-8 text-purple-600" />
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalPayments}</div>
            <div className="text-sm text-gray-600">Total Transactions</div>
            <div className="text-xs text-purple-600 mt-2">Across all properties</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Payment Trends */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Trends</h3>
                <p className="text-sm text-gray-600">Monthly payment performance</p>
              </div>
              <LineChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="amount" name="Amount (₹)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="count" name="Count" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Status Distribution */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Status Distribution</h3>
                <p className="text-sm text-gray-600">Current payment status overview</p>
              </div>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {paymentStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-3">
              {/* Status Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="processing">Processing</option>
                </select>
              </div>

              {/* Date Filters */}
              <select
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>

              {/* Sort By */}
              <select
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amountHigh">Amount (High to Low)</option>
                <option value="amountLow">Amount (Low to High)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by owner, property..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner & Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{payment.ownerName}</div>
                          <div className="text-sm text-gray-500">{payment.property}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{formatCurrency(payment.amount)}</div>
                      <div className="text-sm text-gray-500">{payment.cycle}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{formatDate(payment.paymentDate)}</div>
                      <div className="text-xs text-gray-500">Due: {formatDate(payment.dueDate)}</div>
                    </td>
                    <td className="px-6 py-4">
                      {renderStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4">
                      {renderPaymentMethod(payment.paymentMethod)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="p-2 text-gray-400 hover:text-blue-600"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {payment.status !== 'completed' && (
                          <button
                            onClick={() => handleMarkAsCompleted(payment.id)}
                            className="p-2 text-gray-400 hover:text-green-600"
                            title="Mark as Paid"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleSendReminder(payment)}
                          className="p-2 text-gray-400 hover:text-yellow-600"
                          title="Send Reminder"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadReceipt(payment)}
                          className="p-2 text-gray-400 hover:text-purple-600"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                  ? "No payments match your filters. Try adjusting your search criteria."
                  : "You haven't recorded any payments yet."}
              </p>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First Payment
              </button>
            </div>
          )}
        </div>

        {/* Payment Methods Overview */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods Overview</h3>
              <p className="text-sm text-gray-600">Distribution by payment method</p>
            </div>
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {paymentMethodData.map((method, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  {renderPaymentMethod(method.method)}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(method.amount)}</div>
                <div className="text-sm text-gray-600">{method.count} transactions</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Payment</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    value={newPayment.ownerName}
                    onChange={(e) => setNewPayment({...newPayment, ownerName: e.target.value})}
                    placeholder="Enter owner name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    value={newPayment.property}
                    onChange={(e) => setNewPayment({...newPayment, property: e.target.value})}
                    placeholder="Enter property address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                      value={newPayment.paymentMethod}
                      onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Cash">Cash</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                      value={newPayment.paymentDate}
                      onChange={(e) => setNewPayment({...newPayment, paymentDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                      value={newPayment.dueDate}
                      onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cycle</label>
                  <select
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    value={newPayment.cycle}
                    onChange={(e) => setNewPayment({...newPayment, cycle: e.target.value})}
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="One-Time">One-Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                    rows="3"
                    value={newPayment.notes}
                    onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                    placeholder="Add any additional notes..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPayment}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      {!showPaymentModal && !selectedPayment && (
        <button
          onClick={() => setShowPaymentModal(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default OwnerPayments;