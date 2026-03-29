import { ethers } from 'ethers';
import contractABI from '../abi/AgriTrustCertificate.json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const contractAddress = '0x562eb965505767e74A40c00cb8Ee2998EB994C3d';
const GANACHE_CHAIN_ID_HEX = '0x539'; // 1337

const switchToGanacheNetwork = async (): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: GANACHE_CHAIN_ID_HEX }],
    });
  } catch (error: any) {
    if (error?.code !== 4902) {
      throw error;
    }

    // If Ganache chain is missing in MetaMask, add it and retry the switch.
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: GANACHE_CHAIN_ID_HEX,
          chainName: 'Ganache Local',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['http://127.0.0.1:7545'],
        },
      ],
    });

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: GANACHE_CHAIN_ID_HEX }],
    });
  }
};

export const blockchainService = {
  storeCertificateHash: async (
    certificateNumber: string,
    hash: string
  ): Promise<string> => {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    await switchToGanacheNetwork();

    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    try {
      const estimatedGas = await contract.storeCertificate.estimateGas(
        certificateNumber,
        hash
      );

      // Ganache setups often work better with legacy gas pricing than EIP-1559.
      const feeData = await provider.getFeeData();
      const tx = await contract.storeCertificate(
        certificateNumber,
        hash,
        {
          type: 0,
          gasPrice: feeData.gasPrice ?? undefined,
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        }
      );

      await tx.wait();

      return tx.hash;
    } catch (error: any) {
      console.error('Blockchain transaction failed:', error);
      if (error?.code === 4001 || error?.code === 'ACTION_REJECTED') {
        throw new Error('Transaction rejected in MetaMask.');
      }
      throw new Error(
        error?.shortMessage ||
          error?.message ||
          'Blockchain transaction failed. Confirm you are on Ganache and have test ETH.'
      );
    }
  },
};