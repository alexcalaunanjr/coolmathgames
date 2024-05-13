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
// carousel images
import house1 from '../assets/house1.jpg';
import house2 from '../assets/house2.jpg';
import house3 from '../assets/house3.jpg';
import house4 from '../assets/house4.jpg';
import house5 from '../assets/house5.jpg';
import house6 from '../assets/house6.jpg';


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

function BuyerRetrieveNewListingListUI(props) {
    const [newProperties, setNewProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        document.title = 'Buyer Retrieve New Property Listing';
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
function displayListOfNewListingUI(){
    return (
        <>
        {/* buyer header component */}
        <UserContextProvider><BuyerHeader /></UserContextProvider>


        {/* carousel component */}
        <div className="h-56 sm:h-64 xl:h-96">
        <Carousel pauseOnHover>
            <img src={house1} />
            <img src={house2} />
            <img src={house3} />
            <img src={house4} />
            <img src={house5} />
            <img src={house6} />
        </Carousel>
        </div>
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
                {newProperties.map(property => (
                    <CardProperty property={property}/>
                ))}
            </div>

        <div className='p-10'></div>

        <Footer />
        </>
    );
}
  return (
    displayListOfNewListingUI()
);
}

export default BuyerRetrieveNewListingListUI;