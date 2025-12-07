import React, { useEffect, useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useSearchParams } from 'next/navigation';

import Footer from 'components/Footer';
import Header from 'components/Header';
import First from 'components/Steps/First';
import Second from 'components/Steps/Second';
import Third from 'components/Steps/Third';
import { ReferralsRepository } from 'connectors/repositories/referrals.js';
import { PACKAGE_TYPES } from 'helpers/packages.js';
import { useRequest } from 'hooks/useRequest.js';

const Buy = () => {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const searchParams = useSearchParams();
  const [packageParam, setPackageParam] = useState('');
  const [step, setStep] = useState(1);

  const { call, data } = useRequest(ReferralsRepository.getPrices);

  useEffect(() => {
    if (address) {
      call([address]);
    }
  }, [address]);

  const info = data?.packages?.find(
    p => p.packageId === PACKAGE_TYPES[packageParam?.toUpperCase()]
  );

  const handleStep = () => {
    setStep(prev => {
      return prev + 1;
    });
  };

  useEffect(() => {
    const packageValue = searchParams.get('package');
    if (packageValue) {
      setPackageParam(packageValue);
    }
  }, [searchParams]);

  return (
    <div className="bg-white flex flex-col items-center justify-start w-full min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        <div className="mt-[60px] sm:mt-[40px] flex items-start justify-center max-w-[740px] w-full mb-[120px] sm:mb-[60px]">
          {!address ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[#141414] text-[50px] sm:text-[36px] font-bold">
                Connect your wallet
              </h1>
              <p className="text-[#707070] max-w-[600px] text-center text-[16px] sm:text-[14px] sm:w-full font-medium">
                Scope needs your wallet to activate access and complete the
                process.
              </p>
              <button
                onClick={() => open()}
                className="w-full max-w-[300px] h-[56px] mt-[36px] mb-[60px] flex items-center justify-center bg-black text-white text-[16px] font-semibold px-3 py-2 rounded-full hover:scale-105 transition transform duration-200"
              >
                Connect wallet
              </button>
            </div>
          ) : (
            <React.Fragment>
              {step === 1 && (
                <First
                  handleStep={handleStep}
                  packageInfo={info}
                  address={address}
                  paymentAddress={data?.paymentAddress}
                />
              )}
              {step === 2 && <Second />}
              {step === 3 && <Third />}
            </React.Fragment>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Buy;
