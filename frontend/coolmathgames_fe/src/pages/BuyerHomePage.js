import React from 'react';

import { UserContextProvider } from '../hooks/UseModalContext';
import BuyerHeader from '../components/BuyerHeader';
import BuyerCarousel from '../components/BuyerCarousel';
import SearchBar from '../components/SearchBar';

function BuyerHomePage() {
  return (
    <>
    {/* buyer header */}
    <UserContextProvider><BuyerHeader /></UserContextProvider>

    {/* carousel */}
    <BuyerCarousel />
    <SearchBar />
    </>
  );
}

export default BuyerHomePage;