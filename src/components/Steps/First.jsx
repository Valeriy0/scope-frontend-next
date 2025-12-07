import React, { useEffect, useRef, useState } from 'react';
import { useAppKit, useAppKitProvider } from '@reown/appkit/react';
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

import { useNotifications } from 'components/Notification';
import ScopeLoader from 'components/ScopeLoader';
import { SolanaRepository } from 'connectors/repositories/solana';
import { PACKAGE_INFO } from 'helpers/packages';
import { useRequest } from 'hooks/useRequest';

const LAMPORTS_PER_SOL = 10 ** 9;

const First = ({ packageInfo, address, handleStep, paymentAddress }) => {
  const { showSuccessNotification, showErrorNotification } = useNotifications();
  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider('solana');
  const { open } = useAppKit();
  const pollingIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const { call: callPaymentStatus } = useRequest(
    SolanaRepository.getPaymentStatus
  );

  const stopPolling = () => {
    setIsLoading(false);
    if (pollingIntervalRef.current) {
      window.clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  const startPolling = signature => {
    if (!signature) {
      stopPolling();
      return;
    }

    startTimeRef.current = Date.now();

    pollingIntervalRef.current = window.setInterval(async () => {
      const elapsedTime = Date.now() - startTimeRef.current;

      if (elapsedTime >= 25000) {
        stopPolling();
        return;
      }

      const response = await callPaymentStatus([signature]);

      const status = response?.data || response?.status || response;

      if (status === 'INSUFFICIENT' || status === 'PROCESSED') {
        showSuccessNotification(`You scans added to your extension!`);
        stopPolling();
        handleStep();
      }
    }, 5000);
  };

  const handleSendTx = async () => {
    if (!paymentAddress) return;

    const latestBlockhash = await connection.getLatestBlockhash();

    try {
      const transaction = new Transaction({
        feePayer: new PublicKey(address),
        recentBlockhash: latestBlockhash?.blockhash,
      }).add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address),
          toPubkey: new PublicKey(paymentAddress),
          lamports:
            (packageInfo?.solDiscountedPrice || packageInfo?.solPrice) *
            LAMPORTS_PER_SOL,
        })
      );
      const signature = await walletProvider.sendTransaction(
        transaction,
        connection
      );
      return signature;
    } catch (error) {
      if (error?.message?.includes('insufficient lamports')) {
        showErrorNotification('Insufficient funds');
      }

      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  const onPaymentClick = () => {
    if (address) {
      handleSendTx().then(signature => {
        startPolling(signature);
      });
      setIsLoading(true);
    } else {
      open();
    }
  };

  return (
    <div className="flex items-start justify-start sm:items-start sm:justify-center sm:flex-col sm:w-full sm:ml-[25px] sm:mr-[25px]">
      <div className="px-5 py-6 flex flex-col flex-1 space-y-5">
        <div className="flex flex-col space-y-3 justify-start items-start">
          <h2 className="text-black text-3xl font-bold leading-normal tracking-[-0.64px]">
            {PACKAGE_INFO[packageInfo?.packageId]?.title}
          </h2>
          <span className="text-[#707070] text-sm font-normal leading-normal tracking-[-0.28px]">
            {PACKAGE_INFO[packageInfo?.packageId]?.description}
          </span>
        </div>
        <div className="flex flex-col space-y-3 justify-start items-start">
          <ul className="list-disc flex flex-col space-y-2 justify-start items-start">
            {PACKAGE_INFO[packageInfo?.packageId]?.features.map(
              (feature, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start space-x-2"
                >
                  <span className="text-[#707070] text-sm font-normal leading-normal tracking-[-0.28px]">
                    • {feature}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className="px-5 py-6 min-w-[340px] flex-1 flex flex-col space-y-4 bg-[#F5F5F5] rounded-[24px] sm:w-full">
        <h1 className="text-black text-sm font-normal leading-normal tracking-[-0.28px]">
          Payment
        </h1>
        <div className="flex flex-col space-y-4 justify-start items-start">
          <div className="flex items-center justify-between w-full">
            <span className="text-[#707070] text-sm font-normal leading-normal tracking-[-0.28px]">
              Scans
            </span>
            <span className="text-black text-sm font-normal leading-normal tracking-[-0.28px]">
              {packageInfo?.amount} scans
            </span>
          </div>
          {packageInfo?.discountPercent && (
            <>
              <div className="flex items-center justify-between w-full">
                <span className="text-[#707070] text-sm font-normal leading-normal tracking-[-0.28px]">
                  Price
                </span>
                <span className="text-black text-sm font-normal leading-normal tracking-[-0.28px]">
                  {packageInfo?.solPrice} SOL
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-[#707070] text-sm font-normal leading-normal tracking-[-0.28px]">
                  Sale
                </span>
                <span className="text-[#00AD1A] text-sm font-normal leading-normal tracking-[-0.28px]">
                  {-Math.round(packageInfo?.discountPercent)} %
                </span>
              </div>
            </>
          )}
          <div className="flex items-center justify-between w-full">
            <span className="text-[#707070] text-sm font-normal leading-normal tracking-[-0.28px]">
              Total
            </span>
            <span className="text-black text-sm font-normal leading-normal tracking-[-0.28px]">
              {packageInfo?.solDiscountedPrice || packageInfo?.solPrice} SOL
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[#707070] text-sm font-normal leading-normal tracking-[-0.28px]">
              Address
            </span>
            <span className="text-black text-sm font-normal leading-normal tracking-[-0.28px]">
              {address
                ? `ID ${address.slice(0, 6)}...${address.slice(-4)}`
                : 'Connect wallet'}
            </span>
          </div>
        </div>
        <button
          onClick={onPaymentClick}
          className="w-full h-[56px] bg-black rounded-[100px] text-white flex items-center justify-center hover:scale-105 transition transform duration-200"
        >
          {isLoading ? (
            <ScopeLoader type="white" width="30px" height="30px" />
          ) : address ? (
            <span>Buy {packageInfo?.amount} scans</span>
          ) : (
            <span>Connect wallet</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default First;
