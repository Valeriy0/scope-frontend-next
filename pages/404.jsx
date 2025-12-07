import React from 'react';
import { useRouter } from 'next/navigation';

import Footer from 'components/Footer';
import Header from 'components/Header';

const NotFound = () => {
  const router = useRouter();

  const handleGoToMain = () => {
    router.push('/');
  };

  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-col items-center justify-center mt-[210px] sm:mt-[120px] mb-[120px] sm:mb-[60px] px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="max-w-[616px] tracking-[-2px] sm:tracking-[-1px] text-[68px] sm:text-[36px] leading-[72px] sm:leading-[40px] font-bold text-black">
            404: Lost in the Memeverse!
          </h1>
          <p className="text-[16px] text-[#707070] font-medium mt-2">
            Looks like this page yeeted itself into the void
          </p>

          <button
            onClick={handleGoToMain}
            className="w-full h-[56px] max-w-[300px] bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-[100px] text-[16px] font-semibold hover:scale-105 transition transform duration-200 shadow-lg hover:shadow-xl"
          >
            Go to main
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
