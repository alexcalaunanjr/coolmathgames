import React from 'react';

import { useEffect, useState } from 'react';
import { Carousel } from 'flowbite-react';
import { UserContextProvider } from '../hooks/UseModalContext';
import BuyerHeader from '../components/BuyerHeader';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import CardProperty from "../components/CardProperty";
import UserSearchBar from "../components/BuyerSearchNewListingUI";
import axios from 'axios';

// carousel images
import house1 from '../assets/house1.jpg';
import house2 from '../assets/house2.jpg';
import house3 from '../assets/house3.jpg';
import house4 from '../assets/house4.jpg';
import house5 from '../assets/house5.jpg';
import house6 from '../assets/house6.jpg';

import BG from "../assets/bg1-30.jpg";


function BuyerRetrieveNewListingListUI(props) {
    const [newProperties, setNewProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;


    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        document.title = 'Retrieve New Listing List';
        axios.get(`http://127.0.0.1:5000/BuyerRetrieveNewListingList`, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response) {
                const updatedProperties = response.data.properties.map(property => ({
                    ...property,
                    propertyLink: `/BuyerViewNewListingUI/${property.propertyName}`
                }));
                setNewProperties(updatedProperties);
            }
        })
        .catch(error => {
            console.error('Error fetching new property list', error);
        })
    }, []);

    // Calculate the properties for the current page
    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = newProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const totalPages = Math.ceil(newProperties.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function displayListOfNewListingUI(){
        return (
            <>
            {/* buyer header component */}
            <UserContextProvider><BuyerHeader /></UserContextProvider>


            {/* carousel component */}
            <div className="h-56 sm:h-96 xl:h-[520px]">
            <Carousel pauseOnHover>
                <img src={house1} />
                <img src={house2} />
                <img src={house3} />
                <img src={house4} />
                <img src={house5} />
                <img src={house6} />
            </Carousel>
            </div>

            <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${BG})` }}>
                <div className='p-10'></div>

                <div className="w-1/2 mx-auto pb-10">
                        <UserSearchBar placeholder="Search by name..." onSubmit={handleSearch} setNewProperties={setNewProperties} token={props.token}/>
                </div>

                {/* popular property */}
                <div className='flex px-20 justify-between'>
                    <div>
                        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-[28pt]">New Properties</h1>
                        <p class="mb-6 text-lg font-medium italic text-gray-500 lg:text-[12pt] dark:text-gray-400">
                            New Picks: Explore Our Newest Properties!
                        </p>
                    </div>
                </div>

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
        displayListOfNewListingUI()
    );
}

export default BuyerRetrieveNewListingListUI;