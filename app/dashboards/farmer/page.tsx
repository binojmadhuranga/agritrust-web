'use client';

import { useState } from 'react';
import WalletConnect from '@/app/components/WalletConnect';
import {
  certificateRequestService,
  type CertificateRequest,
} from '../../services/certificateRequestService';

export default function FarmerDashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [request, setRequest] = useState<CertificateRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCertificateRequest = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await certificateRequestService.createCertificateRequest();
      setRequest(response);
    } catch (err: unknown) {
      const fallbackMessage = 'Failed to submit certificate request. Please try again.';
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const responseError = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };
        setError(responseError.response?.data?.message ?? fallbackMessage);
      } else {
        setError(fallbackMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
              <p className="text-gray-600">Welcome to your AgriTrust dashboard</p>
            </div>
            <div className="ml-4">
              <WalletConnect compact />
            </div>
          </div>
        </div>

        {/* Future sections can be added here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate Requests</h3>
            <p className="text-gray-600 text-sm mb-4">
              Submit a certificate request. Your farmer ID will be resolved from your token.
            </p>

            <button
              onClick={handleCertificateRequest}
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-lg font-medium text-white transition-colors ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Request Certificate'}
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            {request && (
              <div className="mt-5 border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm text-gray-700">Latest Request Status:</span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      request.status.toLowerCase() === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : request.status.toLowerCase() === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <p>
                    <span className="font-medium text-gray-800">Request ID:</span>{' '}
                    <span className="text-gray-700">{request.id}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Farmer ID:</span>{' '}
                    <span className="text-gray-700">{request.farmerId}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Farmer Name:</span>{' '}
                    <span className="text-gray-700">{request.farmerName}</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Wallet Address:</span>{' '}
                    <span className="text-gray-700 break-all">{request.walletAddress}</span>
                  </p>
                  <p className="md:col-span-2">
                    <span className="font-medium text-gray-800">Requested At:</span>{' '}
                    <span className="text-gray-700">
                      {new Date(request.requestedAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

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
