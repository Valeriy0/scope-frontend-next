import React from 'react';

const ICONS = [
  // Левая сторона
  {
    id: 1,
    pos: 'top-[8%] left-[10%] sm:left-[-8%]',
    src: '/assets/circleMemes/container_1.png',
  },
  {
    id: 2,
    pos: 'top-1/2 left-[15%] -translate-y-1/2 sm:left-[80%] sm:top-[80%]',
    src: '/assets/circleMemes/container_2.png',
  },
  {
    id: 3,
    pos: 'top-[65%] left-[8%] sm:hidden',
    src: '/assets/circleMemes/container_3.png',
    isSquare: true,
  },
  {
    id: 4,
    pos: 'bottom-[10%] left-[28%] sm:left-[40%] sm:top-[94%]',
    src: '/assets/circleMemes/container_4.png',
  },

  // Верх и низ (центральные)
  {
    id: 5,
    pos: 'top-[22%] left-[25%] sm:left-[40%] sm:top-[14%]',
    src: '/assets/circleMemes/container_5.png',
  },
  {
    id: 6,
    pos: 'top-[5%] left-[50%] sm:left-[80%] sm:top-[-5%]',
    src: '/assets/circleMemes/container_6.png',
  },
  {
    id: 7,
    pos: 'bottom-[5%] left-[50%] sm:left-[2%] sm:top-[80%]',
    src: '/assets/circleMemes/container_7.png',
  },

  // Правая сторона
  {
    id: 8,
    pos: 'top-[20%] right-[25%] sm:hidden',
    src: '/assets/circleMemes/container_8.png',
  },
  {
    id: 9,
    pos: 'top-[10%] right-[10%] sm:hidden',
    src: '/assets/circleMemes/container_9.png',
  },
  {
    id: 10,
    pos: 'top-1/2 right-[14%] -translate-y-1/2 sm:hidden',
    src: '/assets/circleMemes/container_10.png',
  },
  {
    id: 11,
    pos: 'bottom-[18%] right-[8%] sm:hidden',
    src: '/assets/circleMemes/container_11.png',
  },
  {
    id: 12,
    pos: 'bottom-[10%] right-[24%] sm:hidden',
    src: '/assets/circleMemes/container_12.png',
  },
];

const CheckingMeme = () => {
  return (
    <section className="relative w-full min-h-screen bg-white flex items-center justify-center overflow-hidden font-sans p-4">
      {ICONS.map(({ id, pos, isSquare, src }) => (
        <div
          key={id}
          className={`absolute ${pos} ${isSquare ? 'rounded-xl' : 'rounded-full'}`}
        >
          <img src={src} alt="Meme icon" className="w-[80px] h-[80px]" />
        </div>
      ))}

      <div className="relative flex flex-col items-center justify-center text-center z-10">
        <p className="text-black text-[18px] max-w-[271px]">
          The trusted scanner for the Solana meme economy
        </p>
        <div className="font-bold text-gray-900 mt-6 sm:mt-[18px] tracking-[-2px] sm:tracking-[-1.08px] leading-[72px] sm:leading-[40px]">
          <p className="text-[68px] sm:text-[36px]">1,15k users</p>
          <p className="text-[68px] sm:text-[36px]">25k tokens checked</p>
          <p className="text-[68px] sm:text-[36px]">$250k saved from scams</p>
        </div>
        <p className="text-black text-[18px] mt-6 sm:mt-[18px]">
          Used by meme coin gem hunters, creators, and early snipers.
        </p>
      </div>
    </section>
  );
};

export default CheckingMeme;
