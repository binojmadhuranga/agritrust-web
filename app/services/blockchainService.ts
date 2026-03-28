import { ethers } from 'ethers';
import contractABI from '../abi/AgriTrustCertificate.json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const contractAddress = '0x1106e70CadD80e946CACdeB66E587136FB64b9fd';

export const blockchainService = {
  storeCertificateHash: async (
    certificateNumber: string,
    hash: string
  ): Promise<string> => {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    try {
      const tx = await contract.storeCertificate(
        certificateNumber,
        hash
      );

      await tx.wait();

      return tx.hash;
    } catch (error) {
      console.error('Blockchain transaction failed:', error);
      throw error;
    }
  },
};