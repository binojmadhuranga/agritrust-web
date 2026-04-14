'use client';

import { useEffect, useMemo, useState } from 'react';
import { adminService, type AdminUser } from '@/app/services/adminService';

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<number | null>(null);

  const totalUsers = users.length;
  const certifiedUsers = useMemo(() => users.filter((user) => user.isCertified).length, [users]);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await adminService.getAllUsers();
      setUsers(response);
    } catch {
      setError('Failed to load users. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    setDeletingUserId(userId);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await adminService.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setSuccessMessage(response.message || 'User deleted successfully.');
      setConfirmDeleteUserId(null);
    } catch {
      setError('Failed to delete user. Please try again.');
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage platform users and certifications.</p>
            </div>

            <button
              onClick={() => void loadUsers()}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Users'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-5">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{totalUsers}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5">
            <p className="text-sm text-gray-500">Certified Users</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{certifiedUsers}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5">
            <p className="text-sm text-gray-500">Uncertified Users</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{totalUsers - certifiedUsers}</p>
          </div>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
            {successMessage}
          </p>
        )}

        <div className="bg-white rounded-lg shadow-md p-5 overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Users</h2>

          {isLoading && <p className="text-gray-600">Loading users...</p>}

          {!isLoading && users.length === 0 && (
            <p className="text-gray-600">No users found.</p>
          )}

          {!isLoading && users.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Wallet</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Certified</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Joined</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => {
                  const isDeleting = deletingUserId === user.id;
                  const isConfirmingDelete = confirmDeleteUserId === user.id;
                  const rowKey = `${user.id}-${user.email}-${user.createdAt}-${index}`;

                  return (
                    <tr key={rowKey}>
                      <td className="px-4 py-3 text-gray-900 font-medium">{user.fullName}</td>
                      <td className="px-4 py-3 text-gray-700">{user.email}</td>
                      <td className="px-4 py-3 text-gray-700">{user.role}</td>
                      <td className="px-4 py-3 text-gray-700 max-w-[14rem] truncate" title={user.walletAddress ?? 'Not linked'}>
                        {user.walletAddress ?? 'Not linked'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            user.isCertified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {user.isCertified ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {!isConfirmingDelete ? (
                          <button
                            onClick={() => {
                              setSuccessMessage(null);
                              setConfirmDeleteUserId(user.id);
                            }}
                            disabled={isDeleting}
                            className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => void handleDeleteUser(user.id)}
                              disabled={isDeleting}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium text-white ${
                                isDeleting
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-red-600 hover:bg-red-700'
                              }`}
                            >
                              {isDeleting ? 'Deleting...' : 'Confirm'}
                            </button>

                            <button
                              onClick={() => setConfirmDeleteUserId(null)}
                              disabled={isDeleting}
                              className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
