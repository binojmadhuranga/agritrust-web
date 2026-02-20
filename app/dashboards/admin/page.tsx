'use client';

import Navbar from '@/app/components/Navbar';
import { FaUsers, FaStore, FaTractor, FaChartLine, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: FaUsers, color: 'bg-blue-500' },
    { title: 'Active Farmers', value: '456', icon: FaTractor, color: 'bg-green-500' },
    { title: 'Vendors', value: '123', icon: FaStore, color: 'bg-purple-500' },
    { title: 'Total Revenue', value: '$12.5K', icon: FaChartLine, color: 'bg-yellow-500' },
  ];

  const recentActivities = [
    { id: 1, action: 'New farmer registration', user: 'John Doe', time: '2 hours ago', status: 'pending' },
    { id: 2, action: 'Vendor verification completed', user: 'ABC Farms', time: '4 hours ago', status: 'approved' },
    { id: 3, action: 'Product quality report', user: 'Jane Smith', time: '5 hours ago', status: 'pending' },
    { id: 4, action: 'Payment processed', user: 'XYZ Vendor', time: '1 day ago', status: 'approved' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and monitor AgriTrust platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full text-white`}>
                  <stat.icon className="text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  {activity.status === 'approved' ? (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <FaExclamationTriangle className="text-yellow-500 text-xl" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors">
            <h3 className="font-bold text-lg">Approve Registrations</h3>
            <p className="text-sm mt-2">Review and approve pending users</p>
          </button>
          <button className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            <h3 className="font-bold text-lg">Manage Products</h3>
            <p className="text-sm mt-2">Review and moderate product listings</p>
          </button>
          <button className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors">
            <h3 className="font-bold text-lg">Generate Reports</h3>
            <p className="text-sm mt-2">View analytics and system reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}
