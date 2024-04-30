import React from "react";
import { useEffect } from 'react';
import CardProperty from "../components/CardProperty";
import { UserContextProvider } from '../hooks/UseModalContext';
import SellerHeader from '../components/SellerHeader';
import Footer from '../components/Footer';

// assets
// background image
import BG from "../assets/bg1-30.jpg";
// property images
import Prop1 from "../assets/prop1.jpg";
import Prop2 from "../assets/prop2.jpg";
import Prop3 from "../assets/prop3.jpg";
import Prop4 from "../assets/prop4.jpg";
// agent images
import Agent1 from "../assets/agent1.jpg";
import Agent2 from "../assets/agent2.jpg";
import Agent3 from "../assets/agent3.jpg";


// Example: create Agent object
const agent1 = {
    id: 1,
    name: "Peter McProperties",
    email: "",
    pfp: Agent1,
};

const agent2 = {
    id: 2,
    name: "Hedge Dea Bee",
    email: "",
    pfp: Agent2,
};

const agent3 = {
    id: 3,
    name: "Nuñez",
    email: "",
    pfp: Agent3,
};

// Example: create a property object
const property1 = {
    id: 1,
    images: [Prop1],
    title: "Trellis Towers Condo Unit",
    location: "Punggol, Singapore",
    bedrooms: 3,
    bathrooms: 2,
    size: 1000,
    price: 200000,
    agent: agent1
};

const property2 = {
    id: 2,
    images: [Prop2],
    title: "House",
    location: "Home Street",
    bedrooms: 3,
    bathrooms: 2,
    size: 12500,
    price: 1850000,
    agent: agent2
};

const property3 = {
    id: 3,
    images: [Prop3],
    title: "[1 room] 308 Jurong East Street 4 with many",
    location: "Jurong East",
    bedrooms: 1,
    bathrooms: 10,
    size: 500,
    price: 20000,
    agent: agent3
};

const property4 = {
    id: 4,
    images: [Prop4],
    title: "4 Room Flat Tampines",
    location: "Tampines",
    bedrooms: 3,
    bathrooms: 90,
    size: 9032,
    price: 50,
    agent: agent2
};

function SellerHomePage() {
    useEffect(() => {
        document.title = 'Seller Home Page';
    }, []);

    function displayHomePage(){
        return (
            // return container with background image that is slightly transparent
            <>
            {/* Seller header component */}
            <UserContextProvider><SellerHeader /></UserContextProvider>
    
            <div className="bg-cover bg-center min-h-screen justify-center" style={{ backgroundImage: `url(${BG})` }}>
                    
                <div className='p-10'></div>
    
                {/* Title: My Properties */}
                <h1 class="px-20 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-[28pt]">My Properties</h1>
    
                {/* Cards of properties */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 items-center px-20 justify-between">
                    {/* Card 1 */}
                    <CardProperty property={property1} />
                    {/* Card 2 */}
                    <CardProperty property={property2} />
                    {/* Card 3 */}
                    <CardProperty property={property3} />
                    {/* Card 4 */}
                    <CardProperty property={property4} />
                </div>
            </div>
    
            <Footer />
            </>
        );
    }
    
    return (
        displayHomePage()
    )
}
export default SellerHomePage;