import React from 'react';

const FEATURE_DATA = [
  {
    src: '/assets/risks/bundled.svg',
    title: 'Bundled Buys',
    description:
      'Detects if token creators also bought in early. Flags coordinated behavior & insider loops.',
  },
  {
    src: '/assets/risks/share.svg',
    title: 'Developer Share',
    description:
      'Shows how much supply the dev kept. High share = high rug risk.',
  },
  {
    src: '/assets/risks/bots.svg',
    title: 'Volume Bots',
    description:
      'Spots fake volume from trading bots. Cuts through hype, shows real demand.',
  },
  {
    src: '/assets/risks/volume.svg',
    title: 'Developer Volume',
    description:
      'Tracks dev wallet activity in trades. Reveals wash trading & exit signs',
  },
];

const InvestmentParameters = () => {
  return (
    <section className="bg-[#F5F5F5] h-[762px] rounded-[24px] ml-[32px] mr-[32px] mt-[75px] sm:mt-[50px] p-[72px] sm:h-auto sm:p-6 sm:mx-3 sm:mt-16">
      <div className="max-w-screen-xl grid grid-cols-2 gap-24 sm:flex sm:flex-col sm:gap-12">
        <div className="max-w-xl">
          <span className="bg-black text-white text-[10px] font-medium px-4 py-3 rounded-[100px]">
            SOLANA TOKEN SCANNER
          </span>
          <span className="text-[10px] text-[#707070] font-medium ml-3">
            BY ROCKET LAUNCHER
          </span>
          <h1 className="text-[54px] max-w-[536px] font-bold text-black mt-6 leading-[54px] sm:text-4xl sm:leading-tight">
            Risk Analysis Parameters
          </h1>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
            {FEATURE_DATA.map((feature, index) => (
              <div key={index} className="flex flex-col mt-[56px] sm:mt-[36px]">
                <img
                  src={feature.src}
                  alt="Icon"
                  className="w-[24px] h-[24px]"
                />
                <h3 className="text-[18px] font-medium text-black mt-3">
                  {feature.title}
                </h3>
                <p className="text-[#707070] mt-[10px] text-[14px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-[500px] sm:h-auto items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src="/assets/checks/green-small.webp"
              alt="Status Yellow Png"
              className="w-[300px] sm:max-w-[166px] sm:w-full h-[300px] sm:h-[166px] sm:w-full sm:h-auto"
            />

            <img
              src="/assets/checks/red.webp"
              alt="Status Red Png"
              className="w-[300px] sm:max-w-[166px] sm:w-full h-[300px] sm:h-[166px] ml-[18px] sm:ml-[10px] sm:w-full sm:h-auto"
            />
          </div>

          <img
            src="/assets/checks/green-large.webp"
            alt="Status Green Png"
            className="mt-[10px] w-[300px] sm:max-w-[166px] sm:w-full h-[154px] sm:h-[83px] sm:w-full sm:h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default InvestmentParameters;
