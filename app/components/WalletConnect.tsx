'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks/useAppDispatch';
import { useAppSelector } from '@/app/hooks/useAppSelector';
import { connectWallet, disconnectWallet, checkWalletConnection } from '@/app/features/walletThunks';
import { clearWalletError } from '@/app/features/walletSlice';
import { FaWallet, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function WalletConnect() {
  const dispatch = useAppDispatch();
  const { walletAddress, isConnecting, isConnected, error } = useAppSelector(
    (state) => state.wallet
  );

  useEffect(() => {
    // Check if wallet is already connected on component mount
    dispatch(checkWalletConnection());
  }, [dispatch]);

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearWalletError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleConnectWallet = async () => {
    dispatch(connectWallet());
  };

  const handleDisconnectWallet = () => {
    dispatch(disconnectWallet());
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FaWallet className="text-3xl text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Wallet Connection</h2>
        </div>
        {isConnected && (
          <div className="flex items-center space-x-2 text-green-600">
            <FaCheckCircle />
            <span className="text-sm font-medium">Connected</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <FaExclamationCircle className="text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-red-800 font-medium">Error</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!isConnected ? (
          <div>
            <p className="text-gray-600 mb-4">
              Connect your MetaMask wallet to access blockchain features and manage your
              agricultural transactions securely.
            </p>
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className={`
                w-full py-3 px-6 rounded-lg font-semibold text-white
                transition-all duration-200
                ${
                  isConnecting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                }
              `}
            >
              {isConnecting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connecting...
                </span>
              ) : (
                'Connect Wallet'
              )}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Make sure you have MetaMask installed in your browser
            </p>
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Connected Wallet Address</p>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-gray-900 bg-white px-3 py-2 rounded border border-gray-200">
                  {walletAddress && formatAddress(walletAddress)}
                </code>
                <button
                  onClick={() => {
                    if (walletAddress) {
                      navigator.clipboard.writeText(walletAddress);
                    }
                  }}
                  className="ml-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                >
                  Copy Full Address
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Full address: <span className="font-mono">{walletAddress}</span>
              </p>
            </div>
            <button
              onClick={handleDisconnectWallet}
              className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 hover:shadow-lg transition-all duration-200"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Benefits of Connecting</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Secure blockchain-based transactions</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Track your agricultural products on the blockchain</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Transparent and immutable transaction history</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
