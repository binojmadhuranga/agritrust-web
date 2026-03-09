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

  getStoredWalletAddress: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('walletAddress');
    }
    return null;
  },

  disconnectWallet: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('walletAddress');
    }
  },
};
