import React from "react";
import { useEffect, useState } from 'react';
import CardProperty from "../components/CardProperty";
import { UserContextProvider } from '../hooks/UseModalContext';
import BuyerHeader from '../components/BuyerHeader';
import Footer from '../components/Footer';
import BuyerSearchSoldListingUI from "../components/BuyerSearchSoldListingUI";
import axios from 'axios';

// assets
// background image
import BG from "../assets/bg1-30.jpg";


function BuyerRetrieveSoldListingListUI(props) {
    const [soldProperties, setSoldProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    // Check if property is sold
    const [isSold, setIsSold] = useState(props.isSold);

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        document.title = 'Buyer Retrieve Sold Property Listing';

        axios.get(`http://127.0.0.1:5000/BuyerRetrieveSoldListingList`, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response) {
                const updatedSoldProperties = response.data.properties.map(property => ({
                    ...property,
                    propertyLink: `/BuyerViewSoldListingUI/${property.propertyName}`
                }));
                setSoldProperties(updatedSoldProperties);
            }
        })
        .catch(error => {
            console.error('Error fetching new property list', error);
        })
    }, []);

    function displayListOfSoldListingUI(){
        return (
            // return container with background image that is slightly transparent
            <>
            {/* Seller header component */}
            <UserContextProvider><BuyerHeader /></UserContextProvider>

            <div className="bg-cover bg-center min-h-screen justify-center" style={{ backgroundImage: `url(${BG})` }}>

                <div className="w-1/2 mx-auto pt-10">
                    <BuyerSearchSoldListingUI placeholder="Search by name..." onSubmit={handleSearch} setSoldProperties={setSoldProperties} token={props.token}/>
                </div>

                {/* Title: New Properties */}
                <h1 class="pt-10 px-20 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-[28pt]">Sold Properties</h1>

                {/* Cards of properties */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 items-center px-20 justify-between">
                    {soldProperties.map(property => (
                        <CardProperty property={property}/>
                    ))}
                </div>

                <div className='p-10'></div>

            </div>

            <Footer />
            </>
        );
    }
    return (
        displayListOfSoldListingUI()
    );
}

export default BuyerRetrieveSoldListingListUI;