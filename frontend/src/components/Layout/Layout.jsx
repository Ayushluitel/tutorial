import React from 'react';
import Header from './../Header/Header';
import Routers from '../../router/Routers'; // Correct import path
import Footer from './../Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Routers /> {/* Render the routing component here */}
      <Footer />
    </>
  );
};

export default Layout;
