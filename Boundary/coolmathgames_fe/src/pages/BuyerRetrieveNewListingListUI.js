import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardProperty from "../components/CardProperty";
import { UserContextProvider } from '../hooks/UseModalContext';
import BuyerHeader from '../components/BuyerHeader';
import Footer from '../components/Footer';
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

function BuyerRetrieveNewPropertyListingUI(props) {
    const [newProperties, setNewProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    // Check if property is sold
    const [isSold, setIsSold] = useState(props.isSold);

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Function to handle views
    const handleViews = async(id, views) => {
        // data = {id, views: views + 1};
        // await ViewsCount(data);
    };

    useEffect(() => {
        document.title = 'Buyer Retrieve New Property Listing';

        axios.get(`http://127.0.0.1:5000/BuyerRetrieveNewListing`, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response) {
                setNewProperties(response.data.properties);
            }
        })
        .catch(error => {
            console.error('Error fetching new property list', error);
        })
    }, []);

    function displayListOfNewPropertiesUI(){
        return (
            // return container with background image that is slightly transparent
            <>
            {/* Seller header component */}
            <UserContextProvider><BuyerHeader /></UserContextProvider>

            <div className="bg-cover bg-center min-h-screen justify-center" style={{ backgroundImage: `url(${BG})` }}>

                <div className="w-1/2 mx-auto pt-10">
                    <UserSearchBar placeholder="Search by name..." onSubmit={handleSearch} setNewProperties={setNewProperties} token={props.token}/>
                </div>

                {/* Title: New Properties */}
                <h1 class="pt-10 px-20 mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-[28pt]">New Properties</h1>

                {/* Cards of properties */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4 items-center px-20 justify-between">
                    {newProperties.map(property => (
                        <CardProperty property={property}/>
                    ))}
                </div>
            </div>

            <Footer />
            </>
        );
    }
    return (
        displayListOfNewPropertiesUI()
    );
}

export default BuyerRetrieveNewPropertyListingUI;