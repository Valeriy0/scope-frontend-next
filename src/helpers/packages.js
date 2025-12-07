export const PACKAGE_TYPES = {
  LITE: 'lite',
  STARTER: 'starter',
  PRO: 'pro',
};

export const PACKAGE_FEATURES = {
  [PACKAGE_TYPES.LITE]: [
    'Full access to all risk checks',
    'Scan tokens on Pump.fun',
    'Detect volume bots, dev wallets, bundled launches',
    'One-time payment, no subscription',
    'Use anytime, no expiration',
    'Great for trying out Scope',
    'Ideal for first-time users and curious snipers',
  ],
  [PACKAGE_TYPES.PRO]: [
    'Best value per scan',
    'Built for heavy daily usage',
    'Scales with your trading volume',
    'Trusted by analysts, DAO reviewers & meme launchpads',
  ],
  [PACKAGE_TYPES.STARTER]: [
    'All Lite features',
    'Great for consistent DYOR',
    'Use across Pump.fun',
    'Audit-as-you-browse',
  ],
};

export const PACKAGE_INFO = {
  [PACKAGE_TYPES.LITE]: {
    title: 'Lite',
    description: 'Your trial to test Scope in action',
    features: PACKAGE_FEATURES[PACKAGE_TYPES.LITE],
    buttonText: 'Buy 5 scans',
    buttonStyle: 'bg-black text-white',
    isBestValue: false,
  },
  [PACKAGE_TYPES.STARTER]: {
    title: 'Starter',
    description: 'For traders who check before they ape',
    features: PACKAGE_FEATURES[PACKAGE_TYPES.STARTER],
    buttonText: 'Buy 50 scans',
    buttonStyle: 'bg-black text-white',
    isBestValue: false,
  },
  [PACKAGE_TYPES.PRO]: {
    title: 'Pro',
    description: 'For alpha groups & research DAOs',
    features: PACKAGE_FEATURES[PACKAGE_TYPES.PRO],
    buttonText: 'Buy 1000 scans',
    buttonStyle: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white',
    isBestValue: true,
  },
};
