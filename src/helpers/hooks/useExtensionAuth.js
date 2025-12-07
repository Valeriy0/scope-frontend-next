import { useState } from 'react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { getBase58Codec } from '@solana/codecs';

import { useScopeExtension } from 'helpers/hooks/useScopeExtension';

export const useExtensionAuth = () => {
  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('solana');
  const { extensionInstalled, extensionAuthorized } = useScopeExtension();
  const [generatedHash, setGeneratedHash] = useState('');

  // Функция для подписи сообщения
  const signMessage = async () => {
    const encodedMessage = new window.TextEncoder().encode(address);
    const signature = await walletProvider.signMessage(encodedMessage);
    return signature;
  };

  // Функция для создания объекта с подписью и адресом
  const createSignedData = async () => {
    if (!isConnected || !address) {
      throw new Error('Кошелек не подключен');
    }

    const addressSignature = await signMessage();
    const base58Codec = getBase58Codec();
    const signatureString = base58Codec.decode(addressSignature);

    return {
      signatureString: signatureString,
      address: address,
    };
  };

  // Функция для отправки подписанных данных в расширение
  const authenticateWithExtension = async () => {
    if (!isConnected) {
      return;
    }

    try {
      setGeneratedHash('');
      const signedData = await createSignedData();
      setGeneratedHash(signedData.signatureString);

      // Отправляем сообщение с правильным форматом
      const message = {
        type: 'FROM_WEBPAGE_TO_EXTENSION',
        action: 'OPEN_EXTENSION',
        data: signedData,
      };

      window.postMessage(message, '*');

      // Добавляем слушатель ответа от расширения
      const handleExtensionResponse = event => {
        if (event.data && event.data.type === 'FROM_EXTENSION_TO_WEBPAGE') {
          // Удаляем слушатель после получения ответа
          window.removeEventListener('message', handleExtensionResponse);
        }
      };

      window.addEventListener('message', handleExtensionResponse);

      // Удаляем слушатель через 5 секунд, если ответ не получен
      window.setTimeout(() => {
        window.removeEventListener('message', handleExtensionResponse);
      }, 5000);
    } catch (error) {
      setGeneratedHash('');
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  };

  return {
    extensionInstalled,
    extensionAuthorized,
    generatedHash,
    authenticateWithExtension,
  };
};
