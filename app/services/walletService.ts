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
      console.error('walletService.getWalletAddress error:', error);
      // If error (e.g., 404, not found), wallet is not connected
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
      
      // Clear wallet address from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('walletAddress');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('walletService.disconnectWallet error:', error);
      // Clear localStorage even if API fails
      if (typeof window !== 'undefined') {
        localStorage.removeItem('walletAddress');
      }
      throw error;
    }
  },
};
