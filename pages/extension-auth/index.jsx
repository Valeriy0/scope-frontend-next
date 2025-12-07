import React, { useState } from 'react';
import { useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useRouter } from 'next/router';

import Header from 'components/Header';
import { useExtensionAuth } from 'helpers/hooks/useExtensionAuth';

const ExtensionAuth = () => {
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { extensionInstalled, authenticateWithExtension } = useExtensionAuth();
  const [isAuthorizedInExtension, setIsAuthorizedInExtension] = useState(false);
  const [error, setError] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const router = useRouter();

  const handleAuthentication = async () => {
    try {
      setError('');
      await authenticateWithExtension();
    } catch (error) {
      if (error.message.includes('User rejected')) {
        setError('Please approve the signature request in your wallet');
      } else {
        setError('An error occurred during authentication');
      }
      // Очищаем предыдущий таймер если он есть
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      // Очищаем ошибку через 3 секунды
      const newTimeoutId = window.setTimeout(() => setError(''), 3000);
      setTimeoutId(newTimeoutId);
    }
  };

  // Очищаем таймер при размонтировании компонента
  React.useEffect(() => {
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const renderButton = React.useMemo(() => {
    if (isAuthorizedInExtension) {
      return (
        <button
          className="cursor-pointer flex bg-black text-white text-[16px] font-semibold items-center justify-center rounded-[100px] w-full h-[56px] mt-4 hover:scale-105 transition transform duration-200"
          onClick={() => router.push('/')}
        >
          Go to the main page
        </button>
      );
    }
    if (isConnected) {
      return (
        <button
          onClick={handleAuthentication}
          className="cursor-pointer flex bg-black text-white text-[16px] font-semibold items-center justify-center rounded-[100px] w-full h-[56px] mt-4 hover:scale-105 transition transform duration-200"
          disabled={!isConnected}
        >
          Confirm
        </button>
      );
    }
    return (
      <button
        className="cursor-pointer flex bg-black text-white text-[16px] font-semibold items-center justify-center rounded-[100px] w-full h-[56px] mt-4 hover:scale-105 transition transform duration-200"
        onClick={open}
      >
        Connect wallet
      </button>
    );
  }, [
    isConnected,
    extensionInstalled,
    authenticateWithExtension,
    open,
    isAuthorizedInExtension,
    router,
  ]);

  // Добавляем слушатель ответа от расширения
  React.useEffect(() => {
    const handleExtensionResponse = event => {
      if (
        event.data?.type === 'FROM_EXTENSION_TO_WEBPAGE' &&
        event.data?.status === 'success' &&
        event.data?.message === 'Token processed successfully'
      ) {
        setIsAuthorizedInExtension(true);
      }
    };

    window.addEventListener('message', handleExtensionResponse);
    return () => window.removeEventListener('message', handleExtensionResponse);
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-col items-center justify-start w-full">
        <div className="mt-[60px] sm:mt-[40px] flex items-start justify-center max-w-[740px] w-full">
          <div className="flex max-w-[340px] flex-col items-center justify-start w-full rounded-[24px] bg-[#F5F5F5] px-5 py-6">
            <h1 className="text-black max-w-[300px] text-center text-[32px] font-semibold leading-normal tracking-[-0.64px]">
              {isAuthorizedInExtension
                ? 'Authorization successful'
                : 'Confirm authorization'}
            </h1>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
            <div className="mt-4 flex justify-between items-center w-full">
              <p className="text-[16px] font-medium text-[#707070]">Address</p>
              <p className="text-[16px] font-medium text-black">
                {isConnected
                  ? `ID ${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : 'Your wallet here'}
              </p>
            </div>
            {renderButton}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExtensionAuth;
