import { createSlice } from '@reduxjs/toolkit';
import { WalletState } from './walletTypes';
import { connectWallet, disconnectWallet, checkWalletConnection } from './walletThunks';
import { walletService } from '../services/walletService';

const initialState: WalletState = {
  walletAddress: typeof window !== 'undefined' ? walletService.getStoredWalletAddress() : null,
  isConnecting: false,
  isConnected: typeof window !== 'undefined' ? !!walletService.getStoredWalletAddress() : false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearWalletError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Connect wallet
    builder.addCase(connectWallet.pending, (state) => {
      state.isConnecting = true;
      state.error = null;
    });
    builder.addCase(connectWallet.fulfilled, (state, action) => {
      state.isConnecting = false;
      state.walletAddress = action.payload.walletAddress;
      state.isConnected = true;
      state.error = null;
    });
    builder.addCase(connectWallet.rejected, (state, action) => {
      state.isConnecting = false;
      state.error = action.payload as string;
      state.isConnected = false;
    });

    // Disconnect wallet
    builder.addCase(disconnectWallet.fulfilled, (state) => {
      state.walletAddress = null;
      state.isConnected = false;
      state.error = null;
    });

    // Check wallet connection
    builder.addCase(checkWalletConnection.fulfilled, (state, action) => {
      if (action.payload) {
        state.walletAddress = action.payload.walletAddress;
        state.isConnected = true;
      } else {
        state.walletAddress = null;
        state.isConnected = false;
      }
    });
  },
});

export const { clearWalletError } = walletSlice.actions;
export default walletSlice.reducer;
