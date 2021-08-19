import React from 'react';
import Cardhome from '../content/Cardhome';
import { Helmet } from 'react-helmet'
const TITLE = 'Flashwork - หน้าหลัก'
const Home = () => {
  return (
    <>
    <Helmet>
          <title>{ TITLE }</title>
    </Helmet>
      <Cardhome />
  
    </>
  );
};

export default Home;