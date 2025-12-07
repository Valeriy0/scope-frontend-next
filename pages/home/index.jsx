import React from 'react';

import CheckingMeme from 'components/CheckingMeme';
import Footer from 'components/Footer';
import Header from 'components/Header';
import HowWorks from 'components/HowWorks';
import InvestmentParameters from 'components/InvestmentParameters';
import Main from 'components/Main';
import Pricing from 'components/Pricing';
import UsersSaying from 'components/UsersSaying';

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <InvestmentParameters />
      <CheckingMeme />
      <HowWorks />
      <UsersSaying />
      <Pricing />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
