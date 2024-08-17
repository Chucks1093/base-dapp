import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [hasTrustWallet, setHasTrustWallet] = useState(false);

  useEffect(() => {
    checkWalletAvailability();
  }, []);

  const checkWalletAvailability = () => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMetaMask(true);
    }
    if (typeof window.trustwallet !== 'undefined') {
      setHasTrustWallet(true);
    }
  };

  const connectWallet = async (walletType) => {
    try {
      let accounts;
      if (walletType === 'metamask' && window.ethereum) {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (walletType === 'trustwallet' && window.trustwallet) {
        accounts = await window.trustwallet.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        throw new Error(`${walletType} is not available`);
      }

      setWalletAddress(accounts[0]);
      setIsOpen(false);
      toast.success(`Connected to ${walletType}`);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error(`Failed to connect to ${walletType}`);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-end items-baseline h-[15vh] md:h-[20vh]">
        <button
          className="bg-transparent px-[25px] py-[10px] text-[16px] border-white border-[2px] font-[900] rounded-[10px] text-white self-end"
          onClick={() => setIsOpen(true)}
        >
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Select Wallet'}
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed z-[1050] top-0 left-0 right-0 bottom-0 bg-[#00000080] flex items-center justify-center"
        >
          <section 
            className="bg-[#11141F] max-w-[400px] rounded-[10px] z-[1060] py-[16px] pb-[30px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="flex justify-center items-center h-[40px] w-[40px] rounded-full bg-[#1A1F2E] absolute top-[20px] right-[20px] cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={24} />
            </div>
            <section className="p-12">
              <h2 className="text-[24px] font-sans mb-6">Connect a wallet to continue</h2>
              {hasMetaMask && (
                <button
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2"
                  onClick={() => connectWallet('metamask')}
                >
                  Connect to MetaMask
                </button>
              )}
              {hasTrustWallet && (
                <button
                  className="w-full bg-green-500 text-white py-2 px-4 rounded"
                  onClick={() => connectWallet('trustwallet')}
                >
                  Connect to Trust Wallet
                </button>
              )}
              {!hasMetaMask && !hasTrustWallet && (
                <p className="text-red-500">No compatible wallet detected. Please install MetaMask or Trust Wallet.</p>
              )}
            </section>
          </section>
        </div>
      )}
    </>
  );
};

export default Navbar;