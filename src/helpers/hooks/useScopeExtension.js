import { useEffect, useState } from 'react';

export const useScopeExtension = () => {
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [extensionAuthorized, setExtensionAuthorized] = useState(false);

  // Инициализация и проверка наличия расширения
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Инициализируем window?.isScopeInstalled если его нет
    if (typeof window.isScopeInstalled === 'undefined') {
      window.isScopeInstalled = false;
    }

    // Устанавливаем начальные значения из window
    setExtensionInstalled(window.isScopeInstalled || false);
    setExtensionAuthorized(window.isScopeAuthorized || false);

    let intervalId = null;

    const checkScopeExtension = () => {
      const isInstalled =
        window?.isScopeInstalled || window.scopeInstalled || !!window.scope;
      setExtensionInstalled(isInstalled);

      // Если расширение найдено, останавливаем опрос
      if (isInstalled && intervalId) {
        // eslint-disable-next-line no-undef
        clearInterval(intervalId);
      }
    };

    // Первая проверка
    checkScopeExtension();

    // Запускаем периодическую проверку каждую секунду
    // eslint-disable-next-line no-undef
    intervalId = setInterval(checkScopeExtension, 1000);

    return () => {
      if (intervalId) {
        // eslint-disable-next-line no-undef
        clearInterval(intervalId);
      }
    };
  }, []);

  // Слушатель для обнаружения расширения
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScopeInstalled = () => {
      window.isScopeInstalled = true;
      setExtensionInstalled(true);
    };

    // Слушаем custom event на document
    document.addEventListener(
      'scope-extension-installed',
      handleScopeInstalled
    );

    // Также попробуем слушать на window для надежности
    window.addEventListener('scope-extension-installed', handleScopeInstalled);

    return () => {
      document.removeEventListener(
        'scope-extension-installed',
        handleScopeInstalled
      );
      window.removeEventListener(
        'scope-extension-installed',
        handleScopeInstalled
      );
    };
  }, []);

  // Слушатель для отслеживания статуса авторизации
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAuthStatusChange = event => {
      const isAuthorized = event.detail?.authorized ?? false;
      window.isScopeAuthorized = isAuthorized;
      setExtensionAuthorized(isAuthorized);
    };

    // Слушаем custom event на document
    document.addEventListener(
      'scope-extension-authorized',
      handleAuthStatusChange
    );
    return () => {
      document.removeEventListener(
        'scope-extension-authorized',
        handleAuthStatusChange
      );
    };
  }, []);

  // Функция для отправки сообщения в расширение
  const sendMessageToExtension = message => {
    if (typeof window === 'undefined') return;

    try {
      const fullMessage = {
        type: 'FROM_WEBPAGE_TO_EXTENSION',
        action: 'OPEN_EXTENSION',
        ...message,
      };

      window.postMessage(fullMessage, '*');
    } catch {
      // Тихо обрабатываем ошибку
    }
  };

  return {
    extensionInstalled,
    extensionAuthorized,
    sendMessageToExtension,
  };
};
