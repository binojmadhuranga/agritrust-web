import { createAsyncThunk } from '@reduxjs/toolkit';
import { walletService } from '../services/walletService';
import { ethers } from 'ethers';

// Connect wallet thunk - handles MetaMask connection and backend API call
export const connectWallet = createAsyncThunk(
  'wallet/connect',
  async (_, { rejectWithValue }) => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to connect your wallet.');
      }

      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      const walletAddress = accounts[0];

      // Call backend API to register wallet connection
      const response = await walletService.connectWallet(walletAddress);

      return {
        walletAddress: response.walletAddress,
      };
    } catch (error: any) {
      console.error('Connect wallet error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to connect wallet'
      );
    }
  }
);

// Disconnect wallet thunk
export const disconnectWallet = createAsyncThunk(
  'wallet/disconnect',
  async () => {
    walletService.disconnectWallet();
    return null;
  }
);

// Check if wallet is already connected
export const checkWalletConnection = createAsyncThunk(
  'wallet/checkConnection',
  async (_, { rejectWithValue }) => {
    try {
      const storedAddress = walletService.getStoredWalletAddress();
      
      if (!storedAddress) {
        return null;
      }

      // Verify wallet is still connected in MetaMask
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_accounts', []);
        
        if (accounts && accounts.includes(storedAddress)) {
          return { walletAddress: storedAddress };
        }
      }

      // Wallet not connected anymore, clear storage
      walletService.disconnectWallet();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to check wallet connection');
    }
  }
);

// Declare global ethereum type
declare global {
  interface Window {
    ethereum?: any;
  }
}
