import React from 'react';

import { Carousel } from 'flowbite-react';
import { UserContextProvider } from '../hooks/UseModalContext';
import BuyerHeader from '../components/BuyerHeader';
import SearchBar from '../components/SearchBar';

import house1 from '../assets/house1.jpg';
import house2 from '../assets/house2.jpg';
import house3 from '../assets/house3.jpg';
import house4 from '../assets/house4.jpg';
import house5 from '../assets/house5.jpg';
import house6 from '../assets/house6.jpg';


function BuyerHomePage() {
  return (
    <>
    {/* buyer header component */}
    <UserContextProvider><BuyerHeader /></UserContextProvider>


    {/* carousel component */}
    <div className="h-56 sm:h-64 xl:h-96">
      <Carousel pauseOnHover>
        <img src={house1} alt="..." />
        <img src={house2} alt="..." />
        <img src={house3} alt="..." />
        <img src={house4} alt="..." />
        <img src={house5} alt="..." />
        <img src={house6} alt="..." />
      </Carousel>
    </div>

    <div className="">
        <table className='table-fixed border border-transparent bg-white border-separate border-spacing-7 max-w-md mx-auto'>
            <tbody>
                <tr>
                    <td className='w-1/6 text-center'>
                        <p className='font-bold text-2xl'>100+</p>
                        <p>Properties</p>
                    </td>
                    <td>
                        <div className='flex items-center justify-center'>
                            <p class="ms-2 text-2xl font-bold">4.95</p>
                            <svg class="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        
                        <p className='text-center'>Happy Customers</p>
                    </td>
                    <td className='w-1/6 text-center'>
                        <p className='font-bold text-2xl'>20+</p>
                        <p>Agents</p>
                    </td>
                </tr>
            </tbody>
        </table>
        {/* search bar component */}
        <SearchBar />
    </div>


    <div className='p-10'></div>


    {/* popular property */}
    <div className='flex px-14 justify-between'>
        <div>
            <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-[28pt]">Popular Properties</h1>
            <p class="mb-6 text-lg font-medium italic text-gray-500 lg:text-[12pt] dark:text-gray-400">
                Hot Picks: Explore Our Most Sought-After Properties!
            </p>
        </div>
        <div className=''>
        <button type="button" class="text-gray-900 hover:text-yellow-700 font-medium text-lg px-5 py-2.5 text-center inline-flex items-center">
            Explore All
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
        </div>
    </div>

    <div className='p-10'></div>
    </>
  );
}

export default BuyerHomePage;