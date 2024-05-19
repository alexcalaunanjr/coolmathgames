import React, { useState, useEffect } from "react";
import axios from 'axios';

function REASearchListingUI({ id, placeholder, onSubmit, setNewProperties, token }) {
    const [searchQuery, setSearchQuery] = useState("");
    const username = localStorage.getItem('username');

    useEffect(() => {
        axios.post(`http://127.0.0.1:5000/REASearchListing/${username}`, {
            "query": searchQuery
        },{
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.data.properties == "Not Found") {
                setNewProperties([])
            }
            else {
                const properties = response.data.properties.map(property => ({
                    ...property,
                    propertyLink: `/REAViewListingUI/${property.propertyName}`
                }));
                setNewProperties(properties)
            }
        })
        .catch(error => {
            console.error('Error fetching user profiles list', error);
        });
    }, [searchQuery]);

    function handleInputChange (e)  {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        onSubmit && onSubmit(searchQuery);
    };

    function displaySearchBar(){
        return (
            // search bar
            <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id={id} className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-800" placeholder={placeholder} value={searchQuery} onChange={handleInputChange} onKeyPress={handleKeyPress} required />
                    {/* Remove the button element */}
                </div>
            </form>
        )
    }
    
    return(
        displaySearchBar()
    );
}

export default REASearchListingUI;
