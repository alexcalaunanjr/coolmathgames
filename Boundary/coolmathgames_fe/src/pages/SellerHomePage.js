import React from "react";
import { useEffect, useState } from 'react';
import CardProperty from "../components/CardProperty";
import { UserContextProvider } from '../hooks/UseModalContext';
import SellerHeader from '../components/SellerHeader';
import Footer from '../components/Footer';
import axios from 'axios';

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

export default function SellerHomePage(props) {
    const [sellerProperties, setSellerProperties] = useState([]);

    useEffect(() => {
        document.title = 'Seller Home Page';
        const username = localStorage.getItem('username');
        axios.get(`http://127.0.0.1:5000/SellerRetrieveProperties/${username}`, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setSellerProperties(response.data.sellerProperties);
        })
        .catch(error => {
            console.error("Error fetching seller's properties: ", error);
        });
    }, []);
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
                {sellerProperties.map(property => (
                    <CardProperty property={property} />
                ))}
            </div>
        </div>

        <Footer />
        </>
    );
}