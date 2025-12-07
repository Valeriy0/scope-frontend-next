import React from 'react';
import Head from 'next/head';

const HowWorks = () => {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use Scope Scanner for Solana Token Analysis',
    description:
      'Learn how to install and use Scope scanner to analyze Solana tokens and detect potential rug pulls',
    image: 'https://scope.rocketlauncher.gg/assets/howWorks/audit.webp',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Chrome Browser',
      },
      {
        '@type': 'HowToSupply',
        name: 'Solana Wallet',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Scope Chrome Extension',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Install the extension',
        text: 'Download and install Scope extension from Chrome Web Store. No login required.',
        image: 'https://scope.rocketlauncher.gg/assets/howWorks/install.webp',
        url: 'https://chromewebstore.google.com/detail/scope/jpnkjodmcbdnhbcmmgkecjgbfllhpjjd',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Visit any token page',
        text: 'Navigate to any Solana token page. Scope activates automatically as you browse SPL tokens.',
        image: 'https://scope.rocketlauncher.gg/assets/howWorks/visit.webp',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get instant audit insights',
        text: 'View comprehensive token analysis including dev share, bot volume, buy bundles, and more at a glance.',
        image: 'https://scope.rocketlauncher.gg/assets/howWorks/audit.webp',
      },
    ],
  };

  return (
    <section className="bg-white mt-[200px] sm:mt-[80px]">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      </Head>
      <div className="text-center">
        <h2 className="text-[50px] sm:text-[36px] font-bold">How it Works</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center mt-[80px] sm:mt-[40px] px-4 md:px-0">
        <div className="flex flex-col items-center max-w-sm text-center">
          <div className="rounded-[24px] flex justify-center items-center max-w-[340px] sm:w-full max-h-[354px] px-3 py-[78px] max-h-[354px] min-h-[354px] bg-[#F5F5F5]">
            <img src="/assets/howWorks/install.webp" alt="Install img" />
          </div>
          <h3 className="text-lg mt-[32px] font-medium">
            Install the extension
          </h3>
          <p className="text-sm text-gray-600 mt-2 max-w-[272px]">
            Available on Chrome Web Store
            <br />
            (No login required)
          </p>
        </div>

        <div className="flex flex-col ml-[20px] sm:mt-[36px] items-center max-w-sm text-center">
          <div className="rounded-[24px] flex justify-center items-center max-w-[340px] max-h-[354px] px-3 py-[78px] max-h-[354px] min-h-[354px] bg-[#F5F5F5]">
            <img src="/assets/howWorks/visit.webp" alt="Visit img" />
          </div>
          <h3 className="text-lg mt-[32px] font-medium">
            Visit any token page
          </h3>
          <p className="text-sm text-gray-600 mt-2 max-w-[272px]">
            Scope activates automatically as you browse SPL tokens.
          </p>
        </div>

        <div className="flex flex-col ml-[20px] sm:mt-[36px] items-center max-w-sm text-center">
          <div className="flex justify-center items-center rounded-[24px] min-w-[340px] min-h-[354px] max-w-[340px] max-h-[354px] px-3 bg-[#F5F5F5]">
            <img
              src="/assets/howWorks/audit.webp"
              alt="Audit img"
              className="w-[200px] h-[332px]"
            />
          </div>
          <h3 className="text-lg mt-[32px] font-medium">
            Get instant audit insights
          </h3>
          <p className="text-sm text-gray-600 mt-2 max-w-[272px]">
            See dev share, bot volume, buy bundles, and more — at a glance
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
