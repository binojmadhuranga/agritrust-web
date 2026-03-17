'use client';

import { useEffect, useState } from 'react';
import {
  certificateRequestService,
  type CertificateRequest as CertificateRequestType,
} from '@/app/services/certificateRequestService';

const getStatusClasses = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function CertificateRequest() {
  const [requests, setRequests] = useState<CertificateRequestType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificateRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await certificateRequestService.getAllCertificateRequests();
      setRequests(response);
    } catch (err: unknown) {
      const fallbackMessage = 'Failed to load certificate requests. Please try again.';
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCertificateRequests();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Certificate Requests</h3>
          <p className="text-gray-600 text-sm">All certificate requests submitted by farmers</p>
        </div>
        <button
          onClick={fetchCertificateRequests}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {!isLoading && !error && requests.length === 0 && (
        <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
          No certificate requests found.
        </p>
      )}

      {requests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Farmer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Wallet Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Requested At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-3 text-sm text-gray-800">#{request.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    <p className="font-medium">{request.farmerName}</p>
                    <p className="text-xs text-gray-500">Farmer ID: {request.farmerId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 max-w-[280px] break-all">
                    {request.walletAddress}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(request.status)}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(request.requestedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
