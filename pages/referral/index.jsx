import React, { useEffect, useState, useRef } from 'react';
import {
  useAppKitAccount,
  useAppKit,
  useAppKitProvider,
} from '@reown/appkit/react';
import bs58 from 'bs58';
import copyToClipboard from 'copy-to-clipboard';
import { useSearchParams } from 'next/navigation';

import FakeLoader from 'components/FakeLoader';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useNotifications } from 'components/Notification';
import { ReferralsRepository } from 'connectors/repositories/referrals';
import { useRequest } from 'hooks/useRequest';
import { signMessage } from 'utils/utils';
import { SOLANA_SCOPE_API_URL, SIGN_MESSAGE } from 'config';

const Referral = () => {
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const searchParams = useSearchParams();
  const [promoInputValue, setPromoInputValue] = useState('');
  const [isLoadingApply, setIsLoadingApply] = useState(false);
  const { walletProvider } = useAppKitProvider('solana');
  const { showSuccessNotification, showErrorNotification } = useNotifications();
  const timeoutRef = useRef(null);

  const {
    call,
    data,
    isLoading: isLoadingReferralInfo,
  } = useRequest(ReferralsRepository.getReferralInfo);
  const {
    call: getWithdrawStatuses,
    data: withdrawStatutes,
    isLoading: isLoadingWithdrawStatuses,
  } = useRequest(ReferralsRepository.getWithdrawStatuses);
  const { call: callWithdraw, isLoading: isLoadingWithdraw } = useRequest(
    ReferralsRepository.withdrawRewards
  );

  const isLoading =
    isLoadingReferralInfo ||
    isLoadingApply ||
    isLoadingWithdraw ||
    isLoadingWithdrawStatuses;

  useEffect(() => {
    if (address) {
      call([address]);
      getWithdrawStatuses([address]);
    }
  }, [address]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePaste = e => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData('text');

    let extractedCode = pastedText;

    const urlMatch = pastedText.match(/code=([^&]+)/i);
    if (urlMatch && urlMatch[1]) {
      extractedCode = urlMatch[1];
    }

    const trimmedCode = extractedCode.slice(0, 8);

    setPromoInputValue(trimmedCode);
  };

  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      setPromoInputValue(code);
    }
  }, [code]);

  const getReferralLink = referralCode => {
    return `${window.location.origin}/referral?code=${referralCode}`;
  };

  const onCopyReferralLink = () => {
    const code = getReferralLink(details?.referralCode);
    showSuccessNotification(`${code} copied to clipboard!`);
    copyToClipboard(code);
  };

  const onPromoInputChange = e => {
    const value = e.target?.value;

    if (value.includes(' ')) {
      return;
    }

    setPromoInputValue(value);
  };

  const balances = data?.result?.balances;
  const stats = data?.result?.stats;
  const details = data?.result?.details;

  const onApplyPromoCode = async () => {
    if (!promoInputValue) {
      showErrorNotification('Please enter a promo code');
      return;
    }
    if (!address || !walletProvider) {
      showErrorNotification('Please connect your wallet');
      return;
    }
    setIsLoadingApply(true);
    try {
      // Sign the verification message
      const signatureData = await signMessage(walletProvider, SIGN_MESSAGE);
      const b58signature = bs58.encode(signatureData.signature);
      // Send request to backend
      const response = await fetch(`${SOLANA_SCOPE_API_URL}/user/assign-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account: address,
          signature: b58signature,
          code: promoInputValue,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to assign promo code');
      }
      const data = await response.json();
      if (data.result) {
        call([address]);
        getWithdrawStatuses([address]);
      }
      showSuccessNotification('Promo code successfully applied');
      setPromoInputValue('');
    } catch (error) {
      showErrorNotification(error.message);
    } finally {
      setIsLoadingApply(false);
    }
  };

  const onWithdrawClick = async () => {
    if (Number(balances?.unpaidBalance) === 0) {
      showErrorNotification('You have no money to withdraw');
      return;
    }

    const signatureData = await signMessage(walletProvider, SIGN_MESSAGE);
    const b58signature = bs58.encode(signatureData.signature);

    const result = await callWithdraw([
      { account: address, signature: b58signature },
    ]);

    if (result !== undefined) {
      showSuccessNotification(
        'Payment sent, money will reach your account in 5 minutes. Data will be updated in a few seconds.'
      );

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        call([address]);
        getWithdrawStatuses([address]);
      }, 4000);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-col items-center justify-start w-full sm:px-[12px] mb-[120px] sm:mb-[60px]">
        <div className="mt-[60px] sm:mt-[40px] flex flex-col items-start justify-center items-center max-w-[740px] w-full">
          <h1 className="text-[#141414] text-[50px] sm:text-[36px] font-bold">
            Referral Program
          </h1>
          <p className="text-[#707070] max-w-[484px] text-center text-[16px] sm:text-[14px] sm:w-full font-medium">
            Get 10% of every payment your invited users make - for all time.
            They also get a 5% lifetime discount on all plans, even if prices
            change.
          </p>
          <FakeLoader isLoading={isLoading}>
            {isConnected && !isLoading ? (
              <>
                <div className="flex sm:flex-col w-full max-w-[700px] mt-8 sm:mt-4">
                  <div className="bg-[#F5F5F5] flex flex-col items-start justify-center w-full h-[96px] rounded-[24px] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="/assets/referral/total.svg"
                        alt="total"
                        className="w-6 h-6"
                      />
                      <span className="text-[#707070] text-[14px] font-medium">
                        Total Referrals
                      </span>
                    </div>
                    <div className="text-[20px] font-semibold text-[#000]">
                      {stats?.referrals?.totalReferrals || 0}
                    </div>
                  </div>

                  <div className="bg-[#F5F5F5] w-full h-[96px] flex flex-col items-start justify-center rounded-[24px] p-6 ml-4 sm:ml-0 relative sm:mt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="/assets/referral/money.svg"
                        alt="money"
                        className="w-6 h-6"
                      />
                      <span className="text-[#707070] text-[14px] font-medium">
                        Earned money
                      </span>
                    </div>
                    <div className="text-[20px] font-semibold text-[#000]">{`${balances?.unpaidBalance || 0} SOL`}</div>
                    <button
                      onClick={onWithdrawClick}
                      className={`${Number(balances?.unpaidBalance) === 0 ? 'opacity-50' : 'hover:scale-105 transition transform duration-200'} absolute top-[25%] right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center`}
                    >
                      <img
                        src="/assets/referral/withdraw.svg"
                        alt="withdraw"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-[700px] sm:w-full mt-[32px]">
                  <h3 className="text-[16px] font-medium text-[#090909]">
                    My Referral Link
                  </h3>
                  <div className="bg-[#F5F5F5] h-[64px] mt-3 rounded-[24px] p-5 flex items-center justify-between">
                    <input
                      type="text"
                      value={getReferralLink(details?.referralCode)}
                      readOnly
                      className="bg-transparent text-[#000] text-[14px] flex-1 mr-4 outline-none"
                    />
                    <button
                      onClick={onCopyReferralLink}
                      className="w-[44px] h-[44px] bg-black rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 transition transform duration-200"
                    >
                      <img
                        src="/assets/referral/copy.svg"
                        alt="copy"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>

                {!details?.referredByCode && (
                  <div className="w-full max-w-[700px] sm:w-full mt-[32px]">
                    <h3 className="text-[16px] font-medium text-[#090909]">
                      Who Invited Me
                    </h3>
                    <div className="bg-[#F5F5F5] h-[64px] mt-3 rounded-[24px] p-5 flex items-center justify-between">
                      <input
                        placeholder="Enter referral code"
                        type="text"
                        value={promoInputValue}
                        onChange={onPromoInputChange}
                        onPaste={handlePaste}
                        className="bg-transparent text-[#000] text-[14px] flex-1 mr-4 outline-none"
                      />
                      {promoInputValue?.length >= 8 && (
                        <button
                          onClick={onApplyPromoCode}
                          className="w-[80px] h-[44px] text-white text-[14px] font-normal bg-black rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 transition transform duration-200"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {!!withdrawStatutes?.result?.withdrawals?.length && (
                  <div className="w-full max-w-[700px] sm:w-full mt-[32px]">
                    <h3 className="text-[16px] font-medium text-[#090909]">
                      History
                    </h3>
                    {withdrawStatutes?.result?.withdrawals?.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="mt-3 w-full max-w-[700px] sm:w-full rounded-[24px] px-[20px] py-[20px] flex items-center justify-between bg-[#F5F5F5]"
                        >
                          <div className="flex flex-col items-start">
                            <p className="text-[14px] leading-[20px] font-medium text-black capitalize">
                              {item.status}
                            </p>
                            <p className="text-[14px] leading-[20px] font-medium text-black opacity-50">
                              {new Date(item.updatedAt).toLocaleDateString(
                                'en-US',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                }
                              )}
                            </p>
                          </div>
                          <p className="text-[14px] leading-[20px] font-medium text-black">
                            + {parseFloat(item.amount).toFixed(5)} SOL
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => open()}
                className="w-full max-w-[300px] h-[56px] mt-[36px] mb-[60px] flex items-center justify-center bg-black text-white text-[16px] font-semibold px-3 py-2 rounded-full hover:scale-105 transition transform duration-200"
              >
                Connect wallet
              </button>
            )}
          </FakeLoader>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Referral;
