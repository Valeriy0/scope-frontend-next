import React from 'react';
import toast from 'react-hot-toast';

const WRAPPER_STYLE = {
  style: {
    background: '#161617',
    borderRadius: '24px',
  },
};

export function useNotifications() {
  const showSuccessNotification = msg => {
    return toast(
      t => (
        <div className="flex items-center">
          <img
            className="mr-[10px]"
            src="/assets/notifications/success.svg"
            alt="success icon"
          />
          <p className="text-[#02BC08] text-[12px] leading-[16px] font-light">
            {msg}
          </p>
          <img
            className="relative !z-50 ml-[10px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
            src="/assets/notifications/close.svg"
            alt="close icon"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
      ),
      WRAPPER_STYLE
    );
  };

  const showErrorNotification = msg => {
    return toast(
      t => (
        <div className="flex items-center">
          <img
            className="mr-[10px]"
            src="/assets/notifications/error.svg"
            alt="error icon"
          />
          <p className="text-red-500 text-[12px] leading-[16px] font-light">
            {msg?.error?.message || msg.responseText || msg.message || msg}
          </p>
          <img
            className="relative z-50 ml-[10px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
            src="/assets/notifications/close.svg"
            alt="close icon"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
      ),
      WRAPPER_STYLE
    );
  };

  const showInfoNotification = msg => {
    return toast(
      t => (
        <div className="flex items-center">
          <img
            className="mr-[10px]"
            src="/assets/notifications/info.svg"
            alt="info icon"
          />
          <p className="text-[#FB8C3D] text-[12px] leading-[16px] font-light">
            {msg?.error?.message || msg.responseText || msg.message || msg}
          </p>
          <img
            className="relative z-50 ml-[10px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
            src="/assets/notifications/close.svg"
            alt="close icon"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
      ),
      WRAPPER_STYLE
    );
  };

  const showIconNotification = (iconSrc, title, text) => {
    return toast(
      t => (
        <div className="flex items-center">
          {iconSrc && (
            <img
              className="w-[24px] h-[24px] rounded-[100px] mr-2"
              src="/assets/notifications/info.svg"
              alt="notification icon"
            />
          )}
          <div className="flex flex-col">
            <p className="text-[#7277F7] font-bold text-[12px] leading-[16px]">
              {title}
            </p>
            <p className="text-white text-[12px] leading-[16px] font-light">
              {text}
            </p>
          </div>
          <img
            className="relative z-50 ml-[10px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
            src="/assets/notifications/close.svg"
            alt="close icon"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
      ),
      WRAPPER_STYLE
    );
  };

  return {
    showErrorNotification,
    showSuccessNotification,
    showInfoNotification,
    showIconNotification,
  };
}
