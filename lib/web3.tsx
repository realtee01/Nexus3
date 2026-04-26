import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

interface Web3ContextType {
  address: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  provider: null,
  signer: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum as any);
          const accounts = await browserProvider.listAccounts();
          if (accounts.length > 0) {
            const currentSigner = await browserProvider.getSigner();
            setAddress(accounts[0].address);
            setProvider(browserProvider);
            setSigner(currentSigner);
          }
        } catch (error) {
          console.error("Failed to re-connect:", error);
        }
      }
    };
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
          setSigner(null);
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setIsConnecting(true);
      const browserProvider = new ethers.BrowserProvider(window.ethereum as any);
      await browserProvider.send("eth_requestAccounts", []);
      
      const currentSigner = await browserProvider.getSigner();
      const currentAddress = await currentSigner.getAddress();
      
      setProvider(browserProvider);
      setSigner(currentSigner);
      setAddress(currentAddress);
    } catch (error) {
      console.error("User rejected request", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setProvider(null);
    setSigner(null);
    // In actual Web3 apps, you can't force MetaMask to disconnect via code,
    // you just clear the app state.
  };

  return (
    <Web3Context.Provider value={{ address, provider, signer, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);

// TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
