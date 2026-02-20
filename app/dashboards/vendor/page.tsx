'use client';

import Navbar from '@/app/components/Navbar';
import { FaTruck, FaDollarSign, FaClipboardList, FaChartLine, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function VendorDashboard() {
  const stats = [
    { title: 'Total Orders', value: '87', icon: FaClipboardList, color: 'bg-blue-500' },
    { title: 'Revenue', value: '$8,450', icon: FaDollarSign, color: 'bg-green-500' },
    { title: 'Deliveries', value: '65', icon: FaTruck, color: 'bg-purple-500' },
    { title: 'Growth', value: '+15%', icon: FaChartLine, color: 'bg-yellow-500' },
  ];

  const activeOrders = [
    { 
      id: 1, 
      orderId: '#ORD-1234', 
      customer: 'ABC Supermarket', 
      product: 'Organic Tomatoes', 
      quantity: '50 kg',
      amount: '$120', 
      pickup: 'Green Valley Farm',
      status: 'Pending Pickup' 
    },
    { 
      id: 2, 
      orderId: '#ORD-1235', 
      customer: 'XYZ Restaurant', 
      product: 'Fresh Potatoes', 
      quantity: '100 kg',
      amount: '$80', 
      pickup: 'Sunny Acres',
      status: 'In Transit' 
    },
    { 
      id: 3, 
      orderId: '#ORD-1236', 
      customer: 'Local Market', 
      product: 'Organic Carrots', 
      quantity: '30 kg',
      amount: '$90', 
      pickup: 'Harvest Haven',
      status: 'Ready for Pickup' 
    },
  ];

  const recentDeliveries = [
    { id: 1, orderId: '#ORD-1230', customer: 'Fresh Market', amount: '$150', time: '2 hours ago' },
    { id: 2, orderId: '#ORD-1228', customer: 'City Restaurant', amount: '$200', time: '4 hours ago' },
    { id: 3, orderId: '#ORD-1225', customer: 'Corner Store', amount: '$95', time: '1 day ago' },
    { id: 4, orderId: '#ORD-1220', customer: 'Grocery Hub', amount: '$180', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage deliveries and track your performance</p>
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

        {/* Active Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Orders</h2>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-bold text-blue-600">{order.orderId}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'In Transit' 
                          ? 'bg-blue-100 text-blue-800' 
                          : order.status === 'Ready for Pickup'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900">{order.product} - {order.quantity}</p>
                    <p className="text-sm text-gray-500 mt-1">Customer: {order.customer}</p>
                    <p className="text-sm text-gray-500">Pickup from: {order.pickup}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">{order.amount}</p>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      {order.status === 'Pending Pickup' ? 'Start Delivery' : 
                       order.status === 'Ready for Pickup' ? 'Pick Up' : 'Complete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Deliveries */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Deliveries</h2>
            <div className="space-y-3">
              {recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <div>
                      <p className="font-semibold text-gray-900">{delivery.orderId}</p>
                      <p className="text-sm text-gray-500">{delivery.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{delivery.amount}</p>
                    <p className="text-xs text-gray-500">{delivery.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance & Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">On-time Delivery</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Customer Rating</span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completed Orders</span>
                    <span className="font-semibold">65/87</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  View Route Map
                </button>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
