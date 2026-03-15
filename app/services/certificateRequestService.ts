import axiosInstance from './axiosConfig';

export interface CertificateRequest {
  id: number;
  farmerId: number;
  farmerName: string;
  walletAddress: string;
  status: string;
  requestedAt: string;
}

export const certificateRequestService = {
  createCertificateRequest: async (): Promise<CertificateRequest> => {
    const response = await axiosInstance.post<CertificateRequest>('/certificate-requests');
    return response.data;
  },
};
