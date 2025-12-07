import React from 'react';
import { useRouter } from 'next/navigation';

const Third = () => {
  const router = useRouter();

  return (
    <div className="flex max-w-[340px] flex-col items-center justify-start w-full rounded-[24px] bg-[#F5F5F5] px-5 py-6">
      <h1 className="text-black max-w-[160px] text-center text-[32px] font-semibold leading-normal tracking-[-0.64px]">
        Everything is super
      </h1>
      <p className="mt-4 text-[16px] font-medium text-[#707070]">
        Good luck with the tokens
      </p>
      <button
        onClick={() => router.push('/')}
        className="flex bg-black text-white text-[16px] font-semibold items-center justify-center rounded-[100px] w-full h-[56px] mt-4 hover:scale-105 transition transform duration-200"
      >
        To expand
      </button>
    </div>
  );
};

export default Third;
