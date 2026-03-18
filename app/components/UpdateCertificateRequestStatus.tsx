'use client';

import { useState } from 'react';
import {
  certificateRequestService,
  type CertificateRequest,
  type CertificateRequestStatus,
} from '@/app/services/certificateRequestService';

interface UpdateCertificateRequestStatusProps {
  requestId: number;
  currentStatus: string;
  onStatusUpdated: (updatedRequest: CertificateRequest) => void;
}

export default function UpdateCertificateRequestStatus({
  requestId,
  currentStatus,
  onStatusUpdated,
}: UpdateCertificateRequestStatusProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async (status: CertificateRequestStatus) => {
    if (currentStatus.toLowerCase() === status.toLowerCase()) {
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const updatedRequest = await certificateRequestService.updateCertificateRequestStatus(
        requestId,
        status
      );
      onStatusUpdated(updatedRequest);
    } catch (err: unknown) {
      const fallbackMessage = 'Failed to update request status.';
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const responseError = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };
        setError(responseError.response?.data?.message ?? fallbackMessage);
      } else {
        setError(fallbackMessage);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const isApproved = currentStatus.toLowerCase() === 'approved';
  const isRejected = currentStatus.toLowerCase() === 'rejected';

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => void handleStatusUpdate('Approved')}
          disabled={isUpdating || isApproved}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
            isApproved
              ? 'bg-green-600 text-white border-green-600 cursor-not-allowed'
              : 'bg-white text-green-700 border-green-300 hover:bg-green-50 disabled:opacity-60 disabled:cursor-not-allowed'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Approve'}
        </button>

        <button
          type="button"
          onClick={() => void handleStatusUpdate('Rejected')}
          disabled={isUpdating || isRejected}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
            isRejected
              ? 'bg-red-600 text-white border-red-600 cursor-not-allowed'
              : 'bg-white text-red-700 border-red-300 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Reject'}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
