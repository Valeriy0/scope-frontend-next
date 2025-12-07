import React, { useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import Head from 'next/head';

import PricingCard from 'components/Pricing/PricingCard.jsx';
import { ReferralsRepository } from 'connectors/repositories/referrals.js';
import { PACKAGE_TYPES } from 'helpers/packages.js';
import { useRequest } from 'hooks/useRequest.js';

const Pricing = () => {
  const { address } = useAppKitAccount();

  const { call, data } = useRequest(ReferralsRepository.getPrices);

  useEffect(() => {
    call([address]);
  }, [address]);

  const lightInfo = data?.packages?.find(
    p => p.packageId === PACKAGE_TYPES.LITE
  );
  const proInfo = data?.packages?.find(p => p.packageId === PACKAGE_TYPES.PRO);
  const starterInfo = data?.packages?.find(
    p => p.packageId === PACKAGE_TYPES.STARTER
  );

  // Schema.org для Product/Offer
  const generateProductSchema = (packageInfo, packageType) => {
    if (!packageInfo) return null;

    const packageNames = {
      [PACKAGE_TYPES.LITE]: 'Lite',
      [PACKAGE_TYPES.PRO]: 'Pro',
      [PACKAGE_TYPES.STARTER]: 'Starter',
    };

    return {
      '@type': 'Product',
      '@id': `https://scope.rocketlauncher.gg/#product-${packageType}`,
      name: `Scope Scanner ${packageNames[packageType]} Package`,
      description: `${packageInfo.amount} scans for Solana token analysis with Scope scanner`,
      brand: {
        '@type': 'Brand',
        name: 'Scope',
      },
      offers: {
        '@type': 'Offer',
        price: packageInfo.solDiscountedPrice || packageInfo.solPrice,
        priceCurrency: 'SOL',
        availability: 'https://schema.org/InStock',
        url: `https://scope.rocketlauncher.gg/buy?package=${packageType}`,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0], // 30 дней
      },
      category: 'Software',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Scans Included',
          value: packageInfo.amount,
        },
        {
          '@type': 'PropertyValue',
          name: 'Platform',
          value: 'Solana',
        },
      ],
    };
  };

  const productsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Scope Scanner Pricing Plans',
    description:
      'Choose from our flexible pricing plans for Solana token scanning',
    itemListElement: [
      lightInfo && generateProductSchema(lightInfo, PACKAGE_TYPES.LITE),
      proInfo && generateProductSchema(proInfo, PACKAGE_TYPES.PRO),
      starterInfo && generateProductSchema(starterInfo, PACKAGE_TYPES.STARTER),
    ]
      .filter(Boolean)
      .map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: product,
      })),
  };

  return (
    <section className="bg-white mt-[200px] sm:mt-[160px] text-center sm:flex sm:flex-col sm:items-center">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productsSchema),
          }}
        />
      </Head>
      <h2 className="text-[50px] sm:text-[36px] sm:max-w-[280px] font-bold text-[#141414]">
        Only pay for what you scan
      </h2>
      <p className="text-[#707070] text-[16px] mt-4 max-w-xl mx-auto sm:hidden">
        Plug in your wallet and unlock instant access to deep token analysis.
        Transparent pricing. Zero fluff.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-[32px] max-w-6xl mx-auto">
        {lightInfo && <PricingCard packageInfo={lightInfo} />}
        {proInfo && <PricingCard packageInfo={proInfo} />}
        {starterInfo && <PricingCard packageInfo={starterInfo} />}
      </div>

      <p className="text-[14px] font-medium text-[#707070] mt-[24px] sm:mt-[40px] sm:max-w-[340px] max-w-3xl mx-auto mb-[120px]">
        All scans include full audit: dev share, bot volume, bundled buys, and
        more — based on raw on-chain data. Your wallet stays in your control. No
        custody, no risk.
      </p>
    </section>
  );
};

export default Pricing;
