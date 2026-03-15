import axiosInstance from './axiosConfig';

export interface WalletConnectResponse {
  walletAddress: string;
}

export const walletService = {
  connectWallet: async (walletAddress: string): Promise<WalletConnectResponse> => {
    try {
      const response = await axiosInstance.post<WalletConnectResponse>(
        '/wallet/connect',
        { walletAddress }
      );
      
      // Store wallet address in localStorage
      if (response.data.walletAddress) {
        localStorage.setItem('walletAddress', response.data.walletAddress);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('walletService.connectWallet error:', error);
      throw error;
    }
  },

  getWalletAddress: async (): Promise<WalletConnectResponse | null> => {
    try {
      const response = await axiosInstance.get<WalletConnectResponse>(
        '/wallet/address'
      );
      
      // Store wallet address in localStorage if received
      if (response.data.walletAddress) {
        localStorage.setItem('walletAddress', response.data.walletAddress);
        return response.data;
      }
      
      return null;
    } catch (error: any) {
      // Handle 409 (conflict) or other errors - wallet not connected or state mismatch
      if (error.response?.status === 409 || error.response?.status === 404) {
        // Clear localStorage for state conflicts or not found
        if (typeof window !== 'undefined') {
          localStorage.removeItem('walletAddress');
        }
      }
      // Return null for any error - wallet is not properly connected
      return null;
    }
  },

  getStoredWalletAddress: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('walletAddress');
    }
    return null;
  },

  disconnectWallet: async (): Promise<{ message: string }> => {
    try {
      const response = await axiosInstance.delete<{ message: string }>(
        '/wallet/disconnect'
      );
      
      return response.data;
    } catch (error: any) {
      // Handle 404 (not found) or 409 (conflict) - wallet already disconnected or state mismatch
      if (error.response?.status === 404 || error.response?.status === 409) {
        return { message: 'Wallet disconnected successfully' };
      }
      
      // For other errors, throw error
      console.error('walletService.disconnectWallet error:', error);
      throw error;
    }
  },

  clearLocalWallet: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('walletAddress');
    }
  },
};
