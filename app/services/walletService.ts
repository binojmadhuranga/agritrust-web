import axios from 'axios';

const WALLET_API_BASE_URL = 'http://localhost:5029/api';

// Create a separate axios instance for wallet API
const walletAxiosInstance = axios.create({
  baseURL: WALLET_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
walletAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface WalletConnectResponse {
  walletAddress: string;
}

export const walletService = {
  connectWallet: async (walletAddress: string): Promise<WalletConnectResponse> => {
    try {
      const response = await walletAxiosInstance.post<WalletConnectResponse>(
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
