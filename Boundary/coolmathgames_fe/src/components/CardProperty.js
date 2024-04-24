import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Icons
import MapPinIcon from "../assets/icons/MapPinIcon";
import BedIcon from '../assets/icons/BedIcon';
import BathIcon from '../assets/icons/BathIcon';
import { SquareFeetIcon } from '../assets/icons/SquareFeetIcon';

// Card property takes in a property object and displays it
// as a card with an image, title, location, number of bedrooms, number of bathrooms, price, and the account that posted it
export default function CardProperty({ property }) {
    // Have a state to keep track of whether the card is hovered
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/property/${property.id}`}>
            <div className={` bg-white shadow-md rounded-lg overflow-hidden transition-transform ${isHovered ? 'transform scale-105' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            <div style={{ height: '250px', overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                {/* Image */}
                <img
                    src={property.images[0]}
                    alt="Meaningful alt text for an image that is not purely decorative"
                    className="object-cover w-full aspect-square"
                />
            </div>    
            {/* Content */}
            <div className='p-2 pl-4'>
                <div className="flex justify-between">
                    <p className="text-xl font-bold">${property.price.toLocaleString()}</p>
                </div>
                <div className="flex">
                    <p className="text-lg truncate">{property.title}</p>
                </div>
                <div className="flex flex-row">
                    <MapPinIcon/>
                    <p className="text-sm">{property.location}</p>
                </div>
                <div className="flex flex-row">
                    {/* Bedroom */}
                    <p className="text-sm mr-1">{property.bedrooms}</p>
                    <div className="mr-2">
                        <BedIcon/>
                    </div>
                    {/* Bathroom */}
                    <p className="text-sm mr-1">{property.bathrooms}</p>
                    <div className="mr-2">
                        <BathIcon/>
                    </div>
                    {/* Size */}
                    <p className="text-sm mr-1">{property.size} sqft</p>
                    <div className="mr-2">
                        <SquareFeetIcon/>
                    </div>
                </div>
                    {/* profile pic icon and name of user */}
                    <div className="flex flex-row pt-4 pb-2 items-center">
                        <img src={property.agent.pfp} alt="profile pic" className="w-11 h-11 rounded-full"/>
                        <p className="text-lg pl-4">{property.agent.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
