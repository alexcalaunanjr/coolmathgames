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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Check if property is sold
    const [isSold, setIsSold] = useState(props.isSold);

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Calculate the properties for the current page
    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = soldProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const totalPages = Math.ceil(soldProperties.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        document.title = 'List of Sold Property Listings';

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
                    {currentProperties.map(property => (
                        <CardProperty property={property}/>
                    ))}
                </div>

                {/* Pagination */}
                <nav className="flex justify-center py-6">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-2 leading-tight ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50 border-blue-300' : 'text-gray-500 bg-white border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

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