export interface WalletState {
  walletAddress: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}
