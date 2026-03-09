'use client';

import WalletConnect from '@/app/components/WalletConnect';

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome to your AgriTrust dashboard</p>
        </div>

        {/* Wallet Connection Section */}
        <div className="mb-6">
          <WalletConnect />
        </div>

        {/* Future sections can be added here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Products</h3>
            <p className="text-gray-600 text-sm">Manage your agricultural products</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactions</h3>
            <p className="text-gray-600 text-sm">View your transaction history</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">Track your performance metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
