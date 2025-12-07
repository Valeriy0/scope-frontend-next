import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="dns-prefetch" href="https://fonts.cdnfonts.com/" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
        <meta name="yandex-verification" content="1c2fb14d49640809" />

        {/* Page Meta */}
        <meta
          name="description"
          content="Scope is a Solana trading bot and token scanner. Scope scanner is an effective rug checker on Solana, helping you avoid scams and trade meme coins smarter."
        />

        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Scope" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Scope – Solana Trading Bot & Token Scanner | Effective Rug Checker"
        />
        <meta
          name="twitter:title"
          content="Scope – Solana Trading Bot & Token Scanner | Effective Rug Checker"
        />
        <meta
          property="og:description"
          content="Scope is a Solana trading bot and token scanner. Scope scanner is an effective rug checker on Solana, helping you avoid scams and trade meme coins smarter."
        />
        <meta
          name="twitter:description"
          content="Scope is a Solana trading bot and token scanner. Scope scanner is an effective rug checker on Solana, helping you avoid scams and trade meme coins smarter."
        />
        <meta
          property="og:image"
          content="https://scope.rocketlauncher.gg/twitter-logo.jpg"
        />
        <meta property="og:url" content="https://scope.rocketlauncher.gg/" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://scope.rocketlauncher.gg/#organization',
                  name: 'Scope',
                  alternateName: 'RocketLauncher Scope',
                  url: 'https://scope.rocketlauncher.gg',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://scope.rocketlauncher.gg/assets/scope.svg',
                  },
                  description:
                    'Scope is a Solana trading bot and token scanner. Scope scanner is an effective rug checker on Solana, helping you avoid scams and trade meme coins smarter.',
                  foundingDate: '2024',
                  industry: 'Blockchain Security',
                  sameAs: [
                    'https://chromewebstore.google.com/detail/scope/jpnkjodmcbdnhbcmmgkecjgbfllhpjjd',
                  ],
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': 'https://scope.rocketlauncher.gg/#software',
                  name: 'Scope – Solana Token Checker',
                  applicationCategory: 'SecurityApplication',
                  operatingSystem: 'Chrome',
                  description:
                    'Scope is a Solana trading bot and token scanner. Scope scanner is an effective rug checker on Solana, helping you avoid scams and trade meme coins smarter.',
                  url: 'https://scope.rocketlauncher.gg/',
                  downloadUrl:
                    'https://chromewebstore.google.com/detail/scope/jpnkjodmcbdnhbcmmgkecjgbfllhpjjd',
                  publisher: {
                    '@id': 'https://scope.rocketlauncher.gg/#organization',
                  },
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: 4.9,
                    ratingCount: 68,
                  },
                  offers: {
                    '@type': 'Offer',
                    price: 0,
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                  },
                  screenshot:
                    'https://scope.rocketlauncher.gg/assets/howWorks/audit.webp',
                  featureList: [
                    'Real-time token scanning',
                    'Rug pull detection',
                    'Developer share analysis',
                    'Bot volume detection',
                    'Bundle buy analysis',
                    'On-chain data verification',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://scope.rocketlauncher.gg/#website',
                  url: 'https://scope.rocketlauncher.gg/',
                  name: 'Scope',
                  description:
                    'Scope – Solana Trading Bot & Token Scanner | Effective Rug Checker',
                  publisher: {
                    '@id': 'https://scope.rocketlauncher.gg/#organization',
                  },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target:
                      'https://scope.rocketlauncher.gg/?s={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Product',
                  name: 'Scope – Solana Token Checker',
                  image: 'https://scope.rocketlauncher.gg/assets/scope.svg',
                  description:
                    'Scope is a Solana trading bot and token scanner. Scope scanner is an effective rug checker on Solana, helping you avoid scams and trade meme coins smarter.',
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    ratingCount: '68',
                  },
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                },
              ],
            }),
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WH7RKT3R');
            `,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Scope Extension Detection */}
        <Script
          id="scope-extension-detection"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.isScopeInstalled = false;
              }

              document.addEventListener('scope-extension-installed', function(event) {
                if (typeof window !== 'undefined') {
                  window.isScopeInstalled = true;
                }
              });

              window.addEventListener('scope-extension-installed', function(event) {
                if (typeof window !== 'undefined') {
                  window.isScopeInstalled = true;
                }
              });
            `,
          }}
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WH7RKT3R"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Main />
        <NextScript />
        <noscript>
          <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/inter" />
        </noscript>
      </body>
    </Html>
  );
}
