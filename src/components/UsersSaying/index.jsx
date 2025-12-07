import React from 'react';
import Head from 'next/head';

const UsersSaying = () => {
  // Schema.org для отзывов и рейтингов
  const reviewsSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': 'https://scope.rocketlauncher.gg/#product-reviews',
    name: 'Scope Scanner',
    description: 'Solana token scanner and rug checker extension',
    brand: {
      '@type': 'Brand',
      name: 'Scope',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '150',
      reviewCount: '95',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Crypto Trader',
        },
        reviewBody:
          'Scope has saved me from multiple rug pulls. The real-time analysis is incredibly accurate and easy to understand.',
        datePublished: '2024-12-01',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'DeFi Investor',
        },
        reviewBody:
          'Best tool for Solana token analysis. The dev share detection and bot volume analysis are game changers.',
        datePublished: '2024-11-28',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Solana Enthusiast',
        },
        reviewBody:
          'Great extension for scanning tokens. Very helpful for avoiding scams and finding legitimate projects.',
        datePublished: '2024-11-25',
      },
    ],
  };

  return (
    <section className="bg-white text-center mt-[200px] flex flex-col items-center sm:mt-[160px]">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewsSchema),
          }}
        />
      </Head>
      <h2 className="text-[50px] sm:text-[36px] font-bold sm:max-w-[276px]">
        What our users are saying
      </h2>

      <div className="flex justify-center mt-[80px] sm:max-w-[340px] sm:overflow-hidden">
        <img
          src="/assets/usersSaying/info.webp"
          alt="Users saying img"
          className="w-[1060px] min-w-[1060px] h-[500px]"
        />
      </div>
    </section>
  );
};

export default UsersSaying;
