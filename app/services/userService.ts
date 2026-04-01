import axiosInstance from './axiosConfig';

export interface FarmerListItem {
  id: number;
  fullName: string;
  email: string;
  isCertified: boolean;
  isBlockchainVerified: boolean;
}

export interface FarmerDetails extends FarmerListItem {
  walletAddress: string;
  certificateNumber: string | null;
  issuedAt: string | null;
  expiryDate: string | null;
  hash: string | null;
}

export const userService = {
  getFarmers: async (): Promise<FarmerListItem[]> => {
    const response = await axiosInstance.get<FarmerListItem[]>('/users/farmers');
    return response.data;
  },

  getFarmerById: async (id: number): Promise<FarmerDetails> => {
    const response = await axiosInstance.get<FarmerDetails>(`/users/farmers/${id}`);
    return response.data;
  },
};
