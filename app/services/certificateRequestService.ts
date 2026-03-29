import axiosInstance from './axiosConfig';
import { blockchainService } from './blockchainService';

export interface CertificateRequest {
  id: number;
  farmerId: number;
  farmerName: string;
  walletAddress: string;
  status: string;
  requestedAt: string;
  certificateNumber?: string | null;
  hash?: string | null;
  transactionHash?: string | null;
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

    const data = response.data;

    // Store certificate on blockchain if approved and has certificate data
    if (
      status === 'Approved' &&
      data.certificateNumber &&
      data.hash
    ) {
      try {
        const transactionHash = await blockchainService.storeCertificateHash(
          data.certificateNumber,
          data.hash
        );
        data.transactionHash = transactionHash;
      } catch (error) {
        console.error('Failed to store certificate on blockchain:', error);
        // Continue even if blockchain fails - certificate API succeeded
        throw error;
      }
    }

    return data;
  },
};
