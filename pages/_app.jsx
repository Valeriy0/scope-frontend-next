import React, { useEffect, useState } from 'react';
import { solana } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import {
  PhantomWalletAdapter,
  CoinbaseWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import { useScopeExtension } from 'helpers/hooks/useScopeExtension';
import 'styles/globals.css';

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [
    new PhantomWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new SolflareWalletAdapter(),
    new TrustWalletAdapter(),
  ],
});
const projectId = '8151836d4a5fdff76c669be213785977';
const metadata = {
  name: 'scope',
  description: 'scope wallet connect',
  url: 'https://scope.rocketlauncher.gg',
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

const _MAIN_SOLANA_ENDPOINT =
  'https://emera-upzvpf-fast-mainnet.helius-rpc.com';
const _DEV_SOLANA_ENDPOINT = 'https://iris-t3dm5g-fast-devnet.helius-rpc.com';

// { ...solana, rpcUrls: { default: { http: [MAIN_SOLANA_ENDPOINT] } } },
// { ...solanaDevnet, rpcUrls: { default: { http: [DEV_SOLANA_ENDPOINT] } } }

createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana],
  metadata: metadata,
  projectId,
  themeMode: 'dark',
  enableWalletConnect: true,
  features: {
    analytics: true,
    swaps: true,
    legalCheckbox: true,
    connectMethodsOrder: ['wallet'],
    email: false,
    socials: false,
    emailShowWallets: false,
  },
});

const MyApp = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  // Инициализируем хук для проверки расширения Scope
  const { extensionInstalled: _extensionInstalled } = useScopeExtension();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          removeDelay: 1000,
        }}
      />
      <Head>
        <title>
          Scope – Solana Trading Bot & Token Scanner | Effective Rug Checker
        </title>
        <meta
          name="description"
          content="Scope is a Solana trading bot and token scanner. Scope scanner is an effective rug checker on Solana, helping you avoid scams and trade meme coins smarter."
        />
      </Head>
      {mounted && <Component {...pageProps} />}
    </>
  );
};

export default MyApp;
