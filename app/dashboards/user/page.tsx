'use client';

import Navbar from '@/app/components/Navbar';
import { FaShoppingCart, FaHeart, FaClock, FaBox, FaStar, FaSearch } from 'react-icons/fa';

export default function UserDashboard() {
  const stats = [
    { title: 'Orders', value: '12', icon: FaBox, color: 'bg-blue-500' },
    { title: 'Cart Items', value: '5', icon: FaShoppingCart, color: 'bg-green-500' },
    { title: 'Wishlist', value: '8', icon: FaHeart, color: 'bg-red-500' },
    { title: 'Pending', value: '3', icon: FaClock, color: 'bg-yellow-500' },
  ];

  const recentOrders = [
    { 
      id: 1, 
      product: 'Organic Tomatoes', 
      farmer: 'Green Valley Farm', 
      quantity: '5 kg', 
      amount: '$24', 
      status: 'Delivered',
      rating: 5 
    },
    { 
      id: 2, 
      product: 'Fresh Potatoes', 
      farmer: 'Sunny Acres', 
      quantity: '10 kg', 
      amount: '$16', 
      status: 'In Transit',
      rating: 0 
    },
    { 
      id: 3, 
      product: 'Organic Carrots', 
      farmer: 'Harvest Haven', 
      quantity: '3 kg', 
      amount: '$18', 
      status: 'Processing',
      rating: 0 
    },
  ];

  const recommendedProducts = [
    { id: 1, name: 'Fresh Lettuce', farmer: 'Green Valley Farm', price: '$8/kg', rating: 4.8, image: '🥬' },
    { id: 2, name: 'Organic Apples', farmer: 'Orchard Hills', price: '$12/kg', rating: 4.9, image: '🍎' },
    { id: 3, name: 'Sweet Corn', farmer: 'Sunny Acres', price: '$6/kg', rating: 4.7, image: '🌽' },
    { id: 4, name: 'Bell Peppers', farmer: 'Fresh Farms', price: '$10/kg', rating: 4.6, image: '🫑' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
          <p className="text-gray-600 mt-2">Browse fresh products from local farmers</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for fresh products..." 
              className="w-full px-6 py-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{order.product}</p>
                      <p className="text-sm text-gray-500 mt-1">From: {order.farmer}</p>
                      <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{order.amount}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  {order.status === 'Delivered' && order.rating > 0 && (
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 flex">
                        {[...Array(order.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">Rated</span>
                    </div>
                  )}
                  {order.status === 'Delivered' && order.rating === 0 && (
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">
                      Rate this order
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Browse Products
                </button>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  View Cart
                </button>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Track Orders
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="text-6xl text-center mb-3">{product.image}</div>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.farmer}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-bold text-green-600">{product.price}</p>
                  <div className="flex items-center text-yellow-500">
                    <FaStar />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
