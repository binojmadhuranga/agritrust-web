'use client';

import Navbar from '@/app/components/Navbar';
import { FaLeaf, FaDollarSign, FaBoxOpen, FaStar, FaPlus, FaChartBar } from 'react-icons/fa';

export default function FarmerDashboard() {
  const stats = [
    { title: 'Active Products', value: '24', icon: FaBoxOpen, color: 'bg-green-500' },
    { title: 'Total Earnings', value: '$3,245', icon: FaDollarSign, color: 'bg-blue-500' },
    { title: 'Pending Orders', value: '8', icon: FaLeaf, color: 'bg-yellow-500' },
    { title: 'Rating', value: '4.8', icon: FaStar, color: 'bg-purple-500' },
  ];

  const products = [
    { id: 1, name: 'Organic Tomatoes', quantity: '50 kg', price: '$120', status: 'In Stock' },
    { id: 2, name: 'Fresh Potatoes', quantity: '100 kg', price: '$80', status: 'In Stock' },
    { id: 3, name: 'Organic Carrots', quantity: '30 kg', price: '$90', status: 'Low Stock' },
    { id: 4, name: 'Green Beans', quantity: '0 kg', price: '$150', status: 'Out of Stock' },
  ];

  const recentOrders = [
    { id: 1, customer: 'ABC Supermarket', product: 'Organic Tomatoes', amount: '$240', status: 'Delivered' },
    { id: 2, customer: 'XYZ Restaurant', product: 'Fresh Potatoes', amount: '$160', status: 'Pending' },
    { id: 3, customer: 'Local Market', product: 'Organic Carrots', amount: '$180', status: 'Processing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your products and orders</p>
          </div>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md">
            <FaPlus />
            <span>Add Product</span>
          </button>
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

        {/* Products & Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">My Products</h2>
              <FaChartBar className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {product.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{product.price}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        product.status === 'In Stock' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-500 mt-1">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{order.amount}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
