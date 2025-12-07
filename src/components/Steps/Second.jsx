import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useExtensionAuth } from 'helpers/hooks/useExtensionAuth';
import { useScopeExtension } from 'helpers/hooks/useScopeExtension';
import { SOLANA_SCOPE_EXTENSION_URL } from 'config';

const Second = () => {
  const { extensionInstalled, extensionAuthorized } = useScopeExtension();
  const { authenticateWithExtension } = useExtensionAuth();
  const router = useRouter();

  const buttonContent = useMemo(() => {
    if (extensionInstalled) {
      if (extensionAuthorized) {
        return {
          text: 'Go to the main page',
          onClick: () => router.push('/'),
        };
      }

      return {
        text: 'Authorize Extension',
        onClick: authenticateWithExtension,
      };
    } else {
      return {
        text: 'Download for Chrome',
        onClick: () => window.open(SOLANA_SCOPE_EXTENSION_URL, '_blank'),
      };
    }
  }, [
    extensionInstalled,
    extensionAuthorized,
    router,
    authenticateWithExtension,
  ]);

  return (
    <div className="flex max-w-[340px] flex-col items-center justify-start w-full rounded-[24px] bg-[#F5F5F5] px-5 py-6">
      <h1 className="text-black max-w-[160px] text-center text-[32px] font-semibold leading-normal tracking-[-0.64px]">
        Successful purchase
      </h1>
      <p className="mt-4 text-[14px] font-medium text-[#707070] max-w-[300px] text-center leading-[20px]">
        Your scans are ready - download the extension and start scanning
      </p>
      <button
        onClick={buttonContent.onClick}
        className="flex bg-black text-white text-[16px] font-semibold items-center justify-center rounded-[100px] w-full h-[56px] mt-4 hover:scale-105 transition transform duration-200"
      >
        {buttonContent.text}
      </button>
    </div>
  );
};

export default Second;
