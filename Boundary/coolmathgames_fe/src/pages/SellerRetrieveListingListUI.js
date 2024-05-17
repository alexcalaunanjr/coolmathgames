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

function SellerRetrieveListingListUI(props) {
    const [sellerProperties, setSellerProperties] = useState([]);

    useEffect(() => {
        document.title = 'Seller Retrieve Listing List UI';
        const username = localStorage.getItem('username');
        axios.get(`http://127.0.0.1:5000/SellerRetrieveListing/${username}`, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const updatedSellerProperties = response.data.sellerProperties.map(property => ({
                ...property,
                propertyLink: `/SellerViewListingUI/${property.propertyName}`
            }));
            setSellerProperties(updatedSellerProperties);
        })
        .catch(error => {
            console.error("Error fetching seller's properties: ", error);
        });
    }, []);

    function displayRetrieveListingListUI(){
        return(
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
                        <CardProperty property={property}/>
                    ))}
                </div>
            </div>

            <Footer />
            </>
        )
    }
    return (
        displayRetrieveListingListUI()
    );
}

export default SellerRetrieveListingListUI;