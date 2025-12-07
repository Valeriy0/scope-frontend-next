import React, { useMemo } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const router = useRouter();

  const onReferralClick = () => {
    router.push('/referral');
  };

  const renderWalletButton = useMemo(() => {
    if (isConnected) {
      const shortAddress = address.slice(0, 4) + '...' + address.slice(-4);
      return (
        <button
          onClick={() => open()}
          className="relative flex items-center justify-start bg-black text-white text-[16px] font-semibold pl-[52px] pr-3 py-2 rounded-full hover:scale-105 transition transform duration-200"
        >
          <img
            src="/assets/solana.png"
            alt="Wallet Icon"
            className="absolute top-1/2 -translate-y-1/2 left-0 w-[40px] h-[40px]"
          />
          <span>ID {shortAddress}</span>
        </button>
      );
    }
    return (
      <button
        onClick={() => open()}
        className="flex items-center justify-center bg-black text-white text-[16px] font-semibold px-3 py-2 rounded-full hover:scale-105 transition transform duration-200"
      >
        Connect wallet
      </button>
    );
  }, [isConnected, address]);

  return (
    <div className="bg-white flex flex-col items-center text-center px-4 w-full">
      <div className="w-full flex justify-center mt-6">
        <div className="flex items-center justify-between bg-neutral-100 px-[14px] py-3 rounded-full shadow-sm gap-3 sm:gap-6 w-full max-w-[720px]">
          <div
            onClick={() => router.push('/')}
            className="cursor-pointer flex items-center"
          >
            <img
              src="/assets/scope.svg"
              alt="Scope Logo"
              className="w-[32px] h-[32px]"
            />
            <span className="font-semibold text-[20px] ml-1 text-black sm:hidden">
              SCOPE
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={onReferralClick}
              className="text-[#222] mr-[24px] font-semibold text-[16px] cursor-pointer"
            >
              Referral
            </button>
            {renderWalletButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
