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

      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request permissions - this FORCES MetaMask to show popup every time
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
      } catch (permError: any) {
        // If user rejects permission request
        if (permError.code === 4001) {
          throw new Error('Connection request was rejected by user');
        }
        // If wallet_requestPermissions not supported, fall back to eth_requestAccounts
        console.warn('wallet_requestPermissions not supported, using eth_requestAccounts');
      }
      
      // Get accounts after permission granted
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask and try again.');
      }

      const walletAddress = accounts[0];
      
      console.log('Connecting wallet address:', walletAddress);

      // Call backend API to register wallet connection
      const response = await walletService.connectWallet(walletAddress);

      return {
        walletAddress: response.walletAddress,
      };
    } catch (error: any) {
      console.error('Connect wallet error:', error);
      
      // Handle user rejection
      if (error.code === 4001 || error.code === 'ACTION_REJECTED') {
        return rejectWithValue('Connection request was rejected by user');
      }
      
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to connect wallet'
      );
    }
  }
);

// Disconnect wallet thunk
export const disconnectWallet = createAsyncThunk(
  'wallet/disconnect',
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage FIRST before API call to ensure local state is cleared
      walletService.clearLocalWallet();
      
      const response = await walletService.disconnectWallet();
      return response;
    } catch (error: any) {
      console.error('Disconnect wallet error:', error);
      // Ensure localStorage is cleared even on error
      walletService.clearLocalWallet();
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to disconnect wallet'
      );
    }
  }
);

// Check if wallet is already connected
export const checkWalletConnection = createAsyncThunk(
  'wallet/checkConnection',
  async (_, { rejectWithValue }) => {
    try {
      // If there is no locally stored address the user has explicitly disconnected — skip
      // the backend call so a stale backend record cannot re-populate the state.
      const localAddress = walletService.getStoredWalletAddress();
      if (!localAddress) {
        return null;
      }

      // First, check backend for wallet address
      const backendWallet = await walletService.getWalletAddress();
      
      if (backendWallet && backendWallet.walletAddress) {
        // Verify wallet is still connected in MetaMask
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send('eth_accounts', []);
          
          if (accounts && accounts.includes(backendWallet.walletAddress)) {
            // Both backend and MetaMask have the same address - valid connection
            return { walletAddress: backendWallet.walletAddress };
          }
        }
        
        // Backend has wallet but MetaMask doesn't - state mismatch, clear everything
        console.warn('Wallet state mismatch: backend has address but MetaMask does not');
        walletService.clearLocalWallet();
        return null;
      }

      // No wallet on backend, clear local storage
      walletService.clearLocalWallet();
      return null;
    } catch (error: any) {
      // On error, clear local wallet to ensure clean state
      walletService.clearLocalWallet();
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
