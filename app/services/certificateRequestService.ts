import axiosInstance from './axiosConfig';

export interface CertificateRequest {
  id: number;
  farmerId: number;
  farmerName: string;
  walletAddress: string;
  status: string;
  requestedAt: string;
}

export type CertificateRequestStatus = 'Approved' | 'Rejected';

export const certificateRequestService = {
  createCertificateRequest: async (): Promise<CertificateRequest> => {
    const response = await axiosInstance.post<CertificateRequest>('/certificate-requests');
    return response.data;
  },

  getAllCertificateRequests: async (): Promise<CertificateRequest[]> => {
    const response = await axiosInstance.get<CertificateRequest[]>('/certificate-requests');
    return response.data;
  },

  updateCertificateRequestStatus: async (
    id: number,
    status: CertificateRequestStatus
  ): Promise<CertificateRequest> => {
    const response = await axiosInstance.put<CertificateRequest>(
      `/certificate-requests/${id}/status`,
      { status }
    );
    return response.data;
  },
};
