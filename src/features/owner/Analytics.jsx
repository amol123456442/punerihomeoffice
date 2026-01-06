import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  DollarSign,
  Clock,
  Calendar,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Phone,
  MessageSquare,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Analytics = () => {
  // Sample data for charts
  const monthlyRevenueData = [
    { month: "Jan", revenue: 65000, leads: 45, conversions: 12 },
    { month: "Feb", revenue: 82000, leads: 52, conversions: 18 },
    { month: "Mar", revenue: 72000, leads: 48, conversions: 15 },
    { month: "Apr", revenue: 95000, leads: 61, conversions: 22 },
    { month: "May", revenue: 88000, leads: 57, conversions: 20 },
    { month: "Jun", revenue: 105000, leads: 68, conversions: 25 },
    { month: "Jul", revenue: 92000, leads: 59, conversions: 21 },
  ];

  const propertyTypeData = [
    { name: "2 BHK", value: 35, color: "#3B82F6" },
    { name: "3 BHK", value: 28, color: "#10B981" },
    { name: "1 BHK", value: 20, color: "#F59E0B" },
    { name: "Villa", value: 12, color: "#8B5CF6" },
    { name: "Penthouse", value: 5, color: "#EC4899" },
  ];

  const leadSourceData = [
    { source: "Website", leads: 45, conversion: "18%" },
    { source: "Social Media", leads: 32, conversion: "12%" },
    { source: "Referral", leads: 28, conversion: "25%" },
    { source: "Phone", leads: 22, conversion: "15%" },
    { source: "WhatsApp", leads: 18, conversion: "10%" },
  ];

  const performanceMetrics = [
    {
      id: 1,
      name: "Total Properties",
      value: "156",
      change: "+12%",
      icon: Home,
      color: "blue",
      trend: "up",
    },
    {
      id: 2,
      name: "Active Listings",
      value: "89",
      change: "+5%",
      icon: ShoppingBag,
      color: "green",
      trend: "up",
    },
    {
      id: 3,
      name: "Avg. Price",
      value: "₹85L",
      change: "+8%",
      icon: DollarSign,
      color: "purple",
      trend: "up",
    },
    {
      id: 4,
      name: "Avg. Days Listed",
      value: "24",
      change: "-15%",
      icon: Clock,
      color: "orange",
      trend: "down",
    },
    {
      id: 5,
      name: "Conversion Rate",
      value: "18.5%",
      change: "+3.2%",
      icon: Target,
      color: "pink",
      trend: "up",
    },
    {
      id: 6,
      name: "Visitor Growth",
      value: "42%",
      change: "+18%",
      icon: Users,
      color: "indigo",
      trend: "up",
    },
  ];

  const topPerformingAgents = [
    {
      id: 1,
      name: "Rajesh Kumar",
      sales: 12,
      revenue: "₹1.2Cr",
      growth: "+24%",
    },
    { id: 2, name: "Priya Sharma", sales: 10, revenue: "₹98L", growth: "+18%" },
    { id: 3, name: "Amit Patel", sales: 8, revenue: "₹85L", growth: "+15%" },
    { id: 4, name: "Neha Gupta", sales: 7, revenue: "₹76L", growth: "+22%" },
    { id: 5, name: "Vikram Singh", sales: 6, revenue: "₹68L", growth: "+12%" },
  ];

  const [timeRange, setTimeRange] = useState("month");
  const [activeView, setActiveView] = useState("overview");

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name === "revenue"
                ? `₹${entry.value.toLocaleString()}`
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track performance, insights, and business metrics
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {["overview", "revenue", "leads", "performance"].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeView === view
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {performanceMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="bg-white rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}-50`}>
                    <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.name}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Revenue & Leads Overview
                </h3>
                <p className="text-sm text-gray-600">
                  Monthly performance metrics
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Leads</span>
                </div>
              </div>
            </div>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    name="Revenue (₹)"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="leads"
                    name="Leads"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Type Distribution */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Property Type Distribution
                </h3>
                <p className="text-sm text-gray-600">Based on total listings</p>
              </div>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {propertyTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Source Performance */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Lead Source Performance
                </h3>
                <p className="text-sm text-gray-600">
                  Conversion rates by source
                </p>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {leadSourceData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        index === 0
                          ? "bg-blue-100"
                          : index === 1
                          ? "bg-green-100"
                          : index === 2
                          ? "bg-purple-100"
                          : index === 3
                          ? "bg-yellow-100"
                          : "bg-pink-100"
                      }`}
                    >
                      {index === 0 ? (
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      ) : index === 1 ? (
                        <Activity className="w-5 h-5 text-green-600" />
                      ) : index === 2 ? (
                        <Users className="w-5 h-5 text-purple-600" />
                      ) : index === 3 ? (
                        <Phone className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-pink-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.source}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.leads} leads
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {item.conversion}
                    </div>
                    <div className="text-sm text-gray-600">Conversion</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Agents */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Performing Agents
                </h3>
                <p className="text-sm text-gray-600">This {timeRange}</p>
              </div>
              <Users className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {topPerformingAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {agent.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {agent.sales} sales
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {agent.revenue}
                    </div>
                    <div
                      className={`text-sm ${
                        agent.growth.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {agent.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2.5 text-sm text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              View All Agents
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Additional Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Trend Chart */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Market Trend Analysis
                </h3>
                <p className="text-sm text-gray-600">Price trends over time</p>
              </div>
              <LineChart className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Visitor Growth
                </h3>
                <p className="text-sm text-gray-600">
                  Website traffic analytics
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">₹28.5L</div>
            <div className="text-sm opacity-90">Monthly Revenue</div>
            <div className="text-xs opacity-80 mt-2">
              +12.5% from last month
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">1,248</div>
            <div className="text-sm opacity-90">Total Leads</div>
            <div className="text-xs opacity-80 mt-2">+8.2% from last month</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 opacity-80" />
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">18.5%</div>
            <div className="text-sm opacity-90">Conversion Rate</div>
            <div className="text-xs opacity-80 mt-2">Industry avg: 15.2%</div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 opacity-80" />
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold mb-1">24 days</div>
            <div className="text-sm opacity-90">Avg. Time to Sale</div>
            <div className="text-xs opacity-80 mt-2">
              -15% from last quarter
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
          <Filter className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Analytics;
