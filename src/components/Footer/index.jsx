import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <img
              src="/assets/scope.svg"
              alt="Scope logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex sm:flex-col">
            <p className="text-white opacity-50 max-w-[305px] sm:max-w-[336px]">
              Scope helps you avoid token scams by providing real-time,
              automated risk analysis of SPL tokens.
            </p>
            <p className="text-white opacity-50 max-w-[305px] sm:max-w-[336px] ml-5 sm:mt-5 sm:ml-0">
              Built for Solana. Compatible with Pump.fun.
            </p>
            <p className="text-white opacity-50 max-w-[305px] sm:max-w-[336px] ml-5 sm:mt-5 sm:ml-0">
              Scope is a browser extension that analyzes developer behavior,
              artificial volume, bot trading and recycled social identities —
              using raw on-chain data.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="bg-white-100 backdrop-blur-[50px] rounded-[30px] p-4 w-[260px] sm:w-full">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/scope.svg"
                alt="Scope logo"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-white">Scope</p>
                <p className="text-sm text-white opacity-50">@suppport_rl</p>
              </div>
            </div>
            <button
              onClick={() => window.open('https://t.me/suppport_rl', '_blank')}
              className="bg-white-100 hover:bg-[#333] flex items-center justify-center text-white py-2 px-4 rounded-full text-sm font-medium w-full"
            >
              Write to support
              <span className="inline-block ml-2">
                <img
                  src="/assets/footer/support-arrow.svg"
                  alt="Support icon"
                  className="inline h-4 w-4"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white opacity-50 my-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:justify-start sm:items-start">
        <div className="flex items-center space-x-3 text-[16px] text-white opacity-50 sm:flex-col sm:items-start sm:space-x-0 sm:space-y-2">
          <div className="flex">
            <span>
              ©
              {new Date().getFullYear() === 2025
                ? '2025'
                : `2025 - ${new Date().getFullYear()}`}{' '}
              Scope&nbsp;&nbsp;
            </span>

            <a
              href="https://rocketlauncher.gg"
              target="_blank"
              className="underline"
            >
              by Rocket Launcher
            </a>
          </div>

          <a
            href="https://scope.rocketlauncher.gg/privacy.pdf"
            target="_blank"
            className="transition-all duration-300 px-2 py-0.5 rounded-[24px] bg-white/15 hover:bg-white/10"
          >
            Privacy
          </a>
        </div>
        <div className="flex">
          <button
            className="w-[32px] h-[32px]"
            onClick={() => window.open('https://t.me/scopeonsolana', '_blank')}
          >
            <img
              src="/assets/footer/telegram.svg"
              alt="Telegram icon"
              className="w-full h-full"
            />
          </button>

          {/* <img
            src={discordIcon}
            alt="Discord icon"
            className="w-[32px] h-[32px] ml-4 cursor-pointer"
          /> */}
          <button
            className="w-[32px] h-[32px]"
            onClick={() => window.open('https://x.com/Scopeonsol', '_blank')}
          >
            <img
              src="/assets/footer/x.svg"
              alt="X icon"
              className="w-full h-full ml-4"
            />
          </button>
          {/* <img
            src={tiktokIcon}
            alt="TikTok icon"
            className="w-[32px] h-[32px] ml-4 cursor-pointer"
          /> */}
          {/* <img
            src={youtubeIcon}
            alt="YouTube icon"
            className="w-[32px] h-[32px] ml-4 cursor-pointer"
          /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
