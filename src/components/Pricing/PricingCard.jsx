import React from 'react';
import { useRouter } from 'next/navigation';

import { IS_SALE_ACTIVE } from 'helpers/config.js';
import { PACKAGE_INFO } from 'helpers/packages';

const PricingCard = ({ packageInfo }) => {
  const router = useRouter();

  const { title, description, buttonStyle, features, isBestValue } =
    PACKAGE_INFO[packageInfo.packageId];

  const handleBuyClick = () => {
    if (IS_SALE_ACTIVE) {
      window.open('https://t.me/Scopechecker_bot?start=webtop', '_blank');
      return;
    }
    router.push(`/buy?package=${packageInfo?.packageId}`);
  };

  const finalPrice = IS_SALE_ACTIVE
    ? 0
    : packageInfo.solDiscountedPrice || packageInfo.solPrice;
  const discountPercent = IS_SALE_ACTIVE ? 100 : packageInfo.discountPercent;

  return (
    <div className="bg-[#F5F5F5] pt-[24px] pb-[46px] px-[20px] rounded-2xl flex flex-col items-start ml-[20px] sm:max-w-[340px] sm:ml-0 sm:mt-[32px] first:ml-0">
      <div className="flex items-center justify-between">
        <h3 className="text-[32px] font-semibold text-[#000]">{title}</h3>
        {isBestValue && (
          <div className="top-4 right-4 text-[10px] ml-3 font-semibold bg-black text-white p-[10px] rounded-[100px]">
            BEST VALUE
          </div>
        )}
      </div>
      <p className="text-[14px] text-[#707070] mt-3">{description}</p>
      <div className="flex mt-5 relative">
        <p className="text-[50px] font-bold">{finalPrice} SOL</p>
      </div>
      {discountPercent && (
        <div className="flex items-center mt-2">
          <p className="text-[16px] opacity-50 font-medium text-[#000] line-through">
            {packageInfo.solPrice} SOL
          </p>
          <p className="text-[16px] font-medium text-[#00AD1A] ml-2">
            SALE {Math.round(discountPercent)} %
          </p>
        </div>
      )}
      <button
        onClick={handleBuyClick}
        className={`${buttonStyle} flex items-center justify-center rounded-[100px] font-medium w-full h-[56px] mt-4 hover:scale-105 transition transform duration-200`}
      >
        {`Buy ${packageInfo.amount} scans`}
      </button>
      <ul className="text-[14px] text-[#707070] mt-5 space-y-2 text-left">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
