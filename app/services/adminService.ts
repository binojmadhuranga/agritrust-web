import axiosInstance from './axiosConfig';

export interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  walletAddress: string | null;
  createdAt: string;
  isCertified: boolean;
}

export interface DeleteUserResponse {
  message: string;
}

export const adminService = {
  getAllUsers: async (): Promise<AdminUser[]> => {
    const response = await axiosInstance.get<AdminUser[]>('/admin/users');
    return response.data;
  },

  deleteUser: async (id: number): Promise<DeleteUserResponse> => {
    const response = await axiosInstance.delete<DeleteUserResponse>(`/admin/users/${id}`);
    return response.data;
  },
};