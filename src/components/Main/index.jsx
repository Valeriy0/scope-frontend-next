import React from 'react';

import { SOLANA_SCOPE_EXTENSION_URL } from 'config';

const TRUSTED_MAP = [
  {
    src: '/assets/trusted/binance.png',
    alt: 'Binance Logo',
    href: 'https://www.binance.com/en/square/post/26408949419802',
  },
  {
    src: '/assets/trusted/digitalJournal.png',
    alt: 'Digital Journal Logo',
    href: 'https://www.digitaljournal.com/pr/news/prodigy-press-wire/rocket-launcher-releases-scope-chrome-1138409701.html',
  },
  {
    src: '/assets/trusted/google.png',
    alt: 'Google Logo',
    href: 'https://www.google.com/search?q=rocket+launcher+release+scope&client=opera&hs=tXx&sca_esv=168bb5d2636e6f00&biw=1452&bih=782&tbm=nws&sxsrf=AE3TifNbpOfAjdU4qtow6dmYES6Bg8fmPg%3A1752159584249&ei=YNVvaITwDoegseMPjOmGuAQ&ved=0ahUKEwiEoO-Mx7KOAxUHUGwGHYy0AUcQ4dUDCA4&uact=5&oq=rocket+launcher+release+scope&gs_lp=Egxnd3Mtd2l6LW5ld3MiHXJvY2tldCBsYXVuY2hlciByZWxlYXNlIHNjb3BlMgUQIRigATIFECEYnwVI9itQjgZY1ipwAXgAkAEAmAGoAaABhBeqAQUyMC4xMbgBA8gBAPgBAZgCIKAC5hfCAgoQABiABBhDGIoFwgIFEAAYgATCAgYQABgWGB7CAgsQABiABBixAxiDAcICCBAAGIAEGLEDwgIOEAAYgAQYsQMYgwEYigXCAgsQABiABBixAxiKBcICEBAAGIAEGLEDGEMYgwEYigXCAg4QABiABBiRAhixAxiKBcICDRAAGIAEGLEDGEMYigXCAgQQABgDwgILEAAYgAQYkQIYigXCAgcQABiABBgNwgIGEAAYDRgewgIIEAAYBRgNGB7CAggQABgIGA0YHsICCxAAGIAEGIYDGIoFwgIIEAAYgAQYogTCAgUQABjvBcICBxAhGKABGAqYAwCIBgGSBwUxOS4xM6AHtqcBsgcFMTguMTO4B-QXwgcGMC4yNS43yAdM&sclient=gws-wiz-news',
  },
  {
    src: '/assets/trusted/benzinga.png',
    alt: 'Benzinga Logo',
    href: 'https://www.benzinga.com/pressreleases/25/06/g46143173/rocket-launcher-releases-scope-chrome-extension-the-x-ray-for-meme-coin-traders',
  },
  {
    src: '/assets/trusted/tradingview.png',
    alt: 'TradingView Logo',
    href: 'https://www.tradingview.com/news/reuters.com,2025-06-27:newsml_GNX5S76p:0-rocket-launcher-releases-scope-chrome-extension-the-x-ray-for-meme-coin-traders/',
  },
  {
    src: '/assets/trusted/morningstar.png',
    alt: 'Morningstar Logo',
    href: 'https://www.morningstar.com/news/globe-newswire/9485793/rocket-launcher-releases-scope-chrome-extension-the-x-ray-for-meme-coin-traders',
  },
  {
    src: '/assets/trusted/ap.png',
    alt: 'Ap Logo',
    href: 'https://apnews.com/press-release/kisspr/rocket-launcher-releases-scope-chrome-extension-the-x-ray-for-meme-coin-traders-16e286af1d9dc4551d76e59d92b04b81',
  },
];

const Main = () => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="mt-14 sm:mt-20 flex flex-col items-center px-2">
        <h1 className="text-[68px] sm:text-[36px] max-w-[616px] mt-[40px] tracking-[-2px] sm:tracking-[-1.08px] leading-[78px] sm:leading-[40px] font-bold text-black">
          Protect your capital Scan Solana tokens with confidence
        </h1>
        <p className="text-[14px] text-[#707070] font-medium mt-2">
          Instantly detect risky tokens using real-time on-chain data
        </p>

        <div className="mt-8 w-full flex justify-center items-center space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3">
          <a
            href="https://t.me/Scopechecker_bot?start=webtop"
            target="_blank"
            className="flex items-center justify-center w-[260px] h-[80px] flex flex-row items-center space-x-3 bg-white rounded-full px-[14px] bg-[linear-gradient(180deg,#2AABEE_0%,#229ED9_99.26%)] hover:scale-105 transition transform duration-200"
          >
            <img
              src="/assets/footer/telegram.svg"
              alt="Telegram"
              className="w-12 h-12"
            />
            <span className="whitespace-nowrap text-[20px] font-semibold text-white">
              Telegram bot
            </span>
          </a>
          <button
            onClick={() => window.open(SOLANA_SCOPE_EXTENSION_URL, '_blank')}
            className="flex items-center justify-center w-[260px] h-[80px] flex flex-row items-center space-x-3 bg-white rounded-full px-[14px] bg-white border border-solid border-black/50 hover:scale-105 transition transform duration-200"
          >
            <img
              src="/assets/header/chromeLogo.svg"
              alt="chromeLogo"
              className="w-12 h-12"
            />
            <span className="whitespace-nowrap text-[20px] font-semibold text-black">
              Chrome Extension
            </span>
          </button>
        </div>
      </div>

      <div className="mt-[46px] sm:mt-[40px] w-full">
        <p className="text-[14px] text-[#707070] font-medium">
          Our users scan tokens. Top media scanned us.
        </p>
        <div className="mt-[31px] overflow-x-auto whitespace-nowrap px-2 scrollbar-hide">
          <div className="inline-flex gap-6 relative">
            {TRUSTED_MAP.map((item, index) => (
              <img
                src={item.src}
                alt={item.alt}
                key={index}
                className="relative z-[100] cursor-pointer h-[28px] sm:h-auto hover:opacity-80 transition-opacity duration-200"
                onClick={() => window.open(item.href, '_blank')}
                style={{ pointerEvents: 'auto' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
