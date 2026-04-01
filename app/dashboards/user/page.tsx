'use client';

import { useEffect, useState } from 'react';
import {
  userService,
  type FarmerDetails,
  type FarmerListItem,
} from '@/app/services/userService';

export default function UserDashboard() {
  const [farmers, setFarmers] = useState<FarmerListItem[]>([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState<number | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerDetails | null>(null);

  const [isFarmersLoading, setIsFarmersLoading] = useState(true);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [farmersError, setFarmersError] = useState<string | null>(null);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    const loadFarmers = async () => {
      setIsFarmersLoading(true);
      setFarmersError(null);

      try {
        const response = await userService.getFarmers();
        setFarmers(response);

        if (response.length > 0) {
          setSelectedFarmerId(response[0].id);
        }
      } catch {
        setFarmersError('Failed to load farmers. Please try again.');
      } finally {
        setIsFarmersLoading(false);
      }
    };

    void loadFarmers();
  }, []);

  useEffect(() => {
    if (selectedFarmerId === null) {
      setSelectedFarmer(null);
      return;
    }

    const loadFarmerDetails = async () => {
      setIsDetailsLoading(true);
      setDetailsError(null);

      try {
        const response = await userService.getFarmerById(selectedFarmerId);
        setSelectedFarmer(response);
      } catch {
        setDetailsError('Failed to load farmer details. Please try again.');
      } finally {
        setIsDetailsLoading(false);
      }
    };

    void loadFarmerDetails();
  }, [selectedFarmerId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Dashboard</h1>
          <p className="text-gray-600">Browse certified farmers and verify their details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Farmers</h2>

            {isFarmersLoading && <p className="text-gray-600">Loading farmers...</p>}

            {farmersError && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {farmersError}
              </p>
            )}

            {!isFarmersLoading && !farmersError && farmers.length === 0 && (
              <p className="text-gray-600">No farmers found.</p>
            )}

            {!isFarmersLoading && !farmersError && farmers.length > 0 && (
              <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
                {farmers.map((farmer, index) => {
                  const isSelected = selectedFarmerId === farmer.id;

                  return (
                    <button
                      key={`${farmer.id}-${index}`}
                      onClick={() => setSelectedFarmerId(farmer.id)}
                      className={`w-full text-left border rounded-lg p-3 transition-colors ${
                        isSelected
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-medium text-gray-900">{farmer.fullName}</p>
                      <p className="text-sm text-gray-600 truncate">{farmer.email}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            farmer.isCertified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {farmer.isCertified ? 'Certified' : 'Not Certified'}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            farmer.isBlockchainVerified
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {farmer.isBlockchainVerified ? 'Blockchain Verified' : 'Not Verified'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Farmer Details</h2>

            {selectedFarmerId === null && <p className="text-gray-600">Select a farmer to view details.</p>}

            {isDetailsLoading && <p className="text-gray-600">Loading farmer details...</p>}

            {detailsError && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {detailsError}
              </p>
            )}

            {!isDetailsLoading && !detailsError && selectedFarmer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-medium text-gray-800">Full Name:</span>{' '}
                  <span className="text-gray-700">{selectedFarmer.fullName}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Email:</span>{' '}
                  <span className="text-gray-700">{selectedFarmer.email}</span>
                </p>
                <p className="md:col-span-2">
                  <span className="font-medium text-gray-800">Wallet Address:</span>{' '}
                  <span className="text-gray-700 break-all">{selectedFarmer.walletAddress}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Certificate Status:</span>{' '}
                  <span className="text-gray-700">
                    {selectedFarmer.isCertified ? 'Certified' : 'Not Certified'}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Blockchain Status:</span>{' '}
                  <span className="text-gray-700">
                    {selectedFarmer.isBlockchainVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Certificate Number:</span>{' '}
                  <span className="text-gray-700">{selectedFarmer.certificateNumber ?? 'N/A'}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Issued At:</span>{' '}
                  <span className="text-gray-700">
                    {selectedFarmer.issuedAt
                      ? new Date(selectedFarmer.issuedAt).toLocaleString()
                      : 'N/A'}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Expiry Date:</span>{' '}
                  <span className="text-gray-700">
                    {selectedFarmer.expiryDate
                      ? new Date(selectedFarmer.expiryDate).toLocaleString()
                      : 'N/A'}
                  </span>
                </p>
                <p className="md:col-span-2">
                  <span className="font-medium text-gray-800">Hash:</span>{' '}
                  <span className="text-gray-700 break-all">{selectedFarmer.hash ?? 'N/A'}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
