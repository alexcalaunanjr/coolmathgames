import React from 'react';
import { Carousel } from 'flowbite-react';

import house1 from '../assets/house1.jpg';
import house2 from '../assets/house2.jpg';
import house3 from '../assets/house3.jpg';
import house4 from '../assets/house4.jpg';
import house5 from '../assets/house5.jpg';
import house6 from '../assets/house6.jpg';

function BuyerCarousel() {
  return (
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
  );
}

export default BuyerCarousel;