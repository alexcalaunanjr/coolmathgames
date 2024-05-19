import React from "react";
import { useEffect, useState } from 'react';
import CardProperty from "../components/CardProperty";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


import { UserContextProvider } from '../hooks/UseModalContext';

// assets
// background image
import BG from "../assets/bg1-30.jpg";


// components
import REAHeader from "../components/REAHeader";
import SearchListingUI from "../components/REASearchListingUI";
import Footer from "../components/Footer";


function REARetrieveListingListUI(props) {
    const [listingList, setListingList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperty] = useState([])

    const username = localStorage.getItem('username');
    const [Ptoken, setPToken] = useState('');


    useEffect(() => {
        document.title = 'List of Created Property Listings';

        axios.get(`http://127.0.0.1:5000/REARetrieveListingList/${username}` , {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setPToken(props.token)
            const properties = response.data.REAListingList;
            const listingList = properties.map(property => ({
                propertyImage: property.propertyImage,
                propertyName: property.propertyName,
                location: property.location,
                noOfBedrooms: property.noOfBedrooms,
                noOfBathrooms: property.noOfBathrooms,
                area: property.area,
                price: property.price,
                RealEstateAgent: property.RealEstateAgent,
                REAImage: property.REAImage,
                sold: property.sold,
                propertyLink: `/REAViewListingUI/${property.propertyName}`
            }))
            setListingList(listingList)
        })
        .catch(error => {
            console.error('Error fetching listing list', error);
        });
    }, []);

    
    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    function displayREARetrieveListingListUI() {
        return (
            <>
            <UserContextProvider><REAHeader /></UserContextProvider>

            <div className="bg-cover bg-center min-h-screen justify-center" style={{ backgroundImage: `url(${BG})` }}>

                <div className='p-5'></div>

                {/* Search */}
                <SearchListingUI placeholder="Search by name..." onSubmit={handleSearch} setNewProperties={setListingList} token={props.token}/>
                
                <div className='p-5'></div>

                {/* Title: My Properties */}
                <h1 class="px-20 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-[28pt]">My Properties</h1>

                {/* Cards of properties */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 items-center px-20 justify-between">
                    {listingList.map((property) => (
                        <CardProperty property={property} />
                    ))}
                    
                </div>
                <div className="p-10"></div>
            </div>


            <Footer />
            </>
        );
    }
    return (
        displayREARetrieveListingListUI()
    );
}

export default REARetrieveListingListUI;