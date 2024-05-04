import React, { useState, useEffect } from 'react';
import REAHeader from '../components/REAHeader';
import Footer from '../components/Footer';
import { UserContextProvider } from '../hooks/UseModalContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PLTabs from '../components/TabsPropertyListing';
import InsightPopUp from '../components/InsightsPopUp';

// Images
import house2 from '../assets/house2.jpg';
import bg from '../assets/bg3.jpeg';
import agent from '../assets/agent3.jpg';

// Example: create a property object
const agent1 = {
    id: 1,
    fullName: 'Elizabeth Hamilton',
    username: 'agent1',
}

const property1 = {
    id: 1,
    images: house2,
    title: "Trellis Towers Condo Unit",
    location: "Punggol, Singapore",
    bedrooms: 3,
    bathrooms: 2,
    size: 10000,
    price: 200000,
    description: "This is a beautiful condo unit located in the heart of Punggol. It is a 3-bedroom, 2-bathroom unit with a size of 1000 sqft. The unit is fully furnished and comes with a balcony that overlooks the beautiful Punggol Waterway. The condo is equipped with a swimming pool, gym, and BBQ pits for residents to enjoy. It is also conveniently located near Waterway Point Shopping Mall, Punggol MRT Station, and various schools and amenities.",
    unitFeatures: "Fully furnished, Balcony, Overlooking Punggol Waterway",
    facilities: "Swimming Pool, Gym, BBQ Pits",
    isSold: false,
    views: 0,
    favorites: 0
};

function SellerViewPropertyListingUI(props) {
    const id = localStorage.getItem('id');

    const [image, setImage] = useState(property1.images);
    const [title, setTitle] = useState(property1.title);
    const [location, setLocation] = useState(property1.location);
    const [price, setPrice] = useState(property1.price);
    const [bedrooms, setBedrooms] = useState(property1.bedrooms);
    const [bathrooms, setBathrooms] = useState(property1.bathrooms);
    const [size, setSize] = useState(property1.size);
    const [description, setDescription] = useState(property1.description);
    const [unitFeatures, setUnitFeatures] = useState(property1.unitFeatures);
    const [facilities, setFacilities] = useState(property1.facilities);
    const [count, setCount] = useState(0);
    const [views, setViews] = useState(property1.views);
    const [favorites, setFavorites] = useState(property1.favorites);

    // Check if property is sold
    const [isSold, setIsSold] = useState(property1.isSold);
    // Pop up for insights
    const [insightsPopUp, setInsightsPopUp] = useState(false);

    useEffect(() => {
        document.title = 'Seller View Property Listing';

        axios.post(`http://127.0.0.1:5000/sellerViewPL/${id}`, {
            "id": id,
        }, {
        headers: {
            'Authorization': 'Bearer ' + props.token,
            'Content-Type': 'application/json'
        }
        })
        .then((response) => {
            console.log('Property Listing:', response.data.propertyListing);
            if (response) {
                setTitle(response.data.title);
                setLocation(response.data.location);
                setPrice(response.data.price);
                setBedrooms(response.data.bedrooms);
                setBathrooms(response.data.bathrooms);
                setSize(response.data.size);
                setDescription(response.data.description);
                setUnitFeatures(response.data.features);
                setFacilities(response.data.facilities);
                setIsSold(response.data.isSold);
            }
        })
        .catch((error) => {
            console.error('Error fetching property listing:', error);
        })
    }, []);

    // Function to handle insights pop up
    const handleInsights = () => {
        setInsightsPopUp(true);
    }

    const handleReopenPopUp = () => {
        setInsightsPopUp(false);
    }

    function displayPropertyListingUI() {
        return (
            <>
                <UserContextProvider><REAHeader /></UserContextProvider>

                <div className='bg-cover bg-center min-h-screen justify-center object-fit p-10 lg:px-14' 
                    style=
                    {{ 
                        backgroundImage:`linear-gradient(rgba(225, 225, 225, 0.9), rgba(225, 225, 225, 0.9)), url(${bg})`,
                        backgroundSize: 'cover',
                    }} 
                >
                    {/* Property Image */}
                    <div className='relative'>
                        <img src={image} alt="House" className='w-full h-56 sm:h-64 xl:h-96'/>
                        {/* If property sold */}
                        {isSold && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-4xl font-bold">
                                Sold
                            </div>
                        )}
                    </div>
                    <div className='flex pb-10'>
                        <div className='w-1/3 pt-10'>
                            {/* Property Name */}
                            <div className='flex'>
                                <p className='lg:text-3xl md:text-md font-bold'>{title}</p>
                            </div>
                            <div className='flex pt-1'>
                                {/* Location */}
                                <svg className="w-6 h-6 text-black dark:text-black mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                                </svg>
                                <p className='text-md'>{location}</p>
                            </div>
                            {/* Bedroom, Bathroom, Area */}
                            <div className='flex pt-5'>
                                {/* Bedroom */}
                                <div className='lg:w-1/4'>
                                    <div className='w-10'>
                                        <svg
                                            className="w-10 h-10 text-black dark:text-black" // Set the desired width and height here
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M3 6a1 1 0 0 1 .993.883L4 7v6h6V8a1 1 0 0 1 .883-.993L11 7h8a3 3 0 0 1 2.995 2.824L22 10v8a1 1 0 0 1-1.993.117L20 18v-3H4v3a1 1 0 0 1-1.993.117L2 18V7a1 1 0 0 1 1-1"
                                            />
                                            <path d="M7 8a2 2 0 1 1-1.995 2.15L5 10l.005-.15A2 2 0 0 1 7 8"></path>
                                        </svg>
                                        <p className='pt-2 text-md text-center'>{bedrooms}</p>
                                    </div>
                                </div>
                                {/* Bathroom */}
                                <div className='lg:w-1/4'>
                                    <div className='w-10'>
                                        <svg
                                            className="w-10 h-10 text-black dark:text-black"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 -4 24 28"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M3.5 4.135a1.635 1.635 0 0 1 3.153-.607l.144.358a4.09 4.09 0 0 0-1.38 1.774a4.179 4.179 0 0 0-.02 3.107a.75.75 0 0 0 .995.413l5.96-2.566a.75.75 0 0 0 .402-.963a3.973 3.973 0 0 0-2.132-2.213a3.843 3.843 0 0 0-2.466-.192l-.11-.275A3.135 3.135 0 0 0 2 4.135V11h-.25a.75.75 0 0 0 0 1.5H2v.355c0 .375 0 .595.016.84c.142 2.237 1.35 4.302 3.102 5.652a.745.745 0 0 0-.039.068l-1 2a.75.75 0 0 0 1.342.67l.968-1.935a7.358 7.358 0 0 0 2.58.765c.245.025.394.03.648.04h.007c.74.028 1.464.045 2.126.045c.662 0 1.386-.017 2.126-.045h.007c.254-.01.404-.015.648-.04a7.358 7.358 0 0 0 2.58-.765l.968 1.936a.75.75 0 0 0 1.342-.671l-1-2a.796.796 0 0 0-.038-.068c1.751-1.35 2.96-3.416 3.102-5.652c.015-.245.015-.465.015-.84v-.038c0-.06 0-.123-.004-.18a1.752 1.752 0 0 0-.014-.137h.268a.75.75 0 0 0 0-1.5H3.5z"
                                            ></path>
                                        </svg>
                                        <p className='pt-2 text-md text-center'>{bathrooms}</p>
                                    </div>
                                </div>
                                {/* Area */}
                                <div className='lg-1/4'>
                                    <div>
                                        <svg
                                            className="w-10 h-10 text-black dark:text-black"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M3 5v16h6v-1.5H7V18h2v-1.5H5V15h4v-1.5H7V12h2v-1.5H5V9h4V5h1.5v4H12V7h1.5v2H15V5h1.5v4H18V7h1.5v2H21V3H5a2 2 0 0 0-2 2m3 2a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1a1 1 0 0 1-1 1"
                                            ></path>
                                        </svg>
                                        <p className='pt-2 text-md text-left'>{size} sqft</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Price */}
                        <div className='w-1/3 pt-10'>
                            <p className='lg:text-3xl md:text-md font-bold text-center'>${price}</p>
                        </div>
                        <div className='w-1/3 pt-10'>
                            <div className='h-12 flex justify-end'>
                                {/* Insights */}
                                <button className='flex items-center justify-center bg-transparent text-black p-3 border border-black rounded-lg hover:bg-white lg:w-1/3 w-1/2'
                                    onClick={handleInsights}
                                >
                                    <svg class="w-[32px] h-[32px] text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"/>
                                    </svg>
                                    Insights
                                </button>
                                {/* Pop up for insights */}
                                {insightsPopUp && 
                                <InsightPopUp
                                    views = {views}
                                    favorites = {favorites}
                                    openModal={insightsPopUp}
                                    onClose={handleReopenPopUp} 
                                />}
                            </div>
                            <div className='h-12 flex justify-end items-center mt-10'>
                                <img src={agent} alt="Agent" className='w-12 h-12 rounded-full mr-2'/>
                                <p className='text-md items-center'> {agent1.fullName}</p>
                            </div>
                        </div>
                    </div>
                    {/* A straight line */}
                    <div className='w-2/3 pb-10'>
                        <hr className='border-t-1 border-black'/>
                    </div>
                    {/* Description */}
                    <div className='w-2/3 pb-10'>
                        <p className='lg:text-2xl md:text-md font-bold pb-5'>About this property</p>
                        <p className='text-md'>{description}</p>
                    </div>
                    {/* A straight line */}
                    <div className='w-2/3 pb-10'>
                        <hr className='border-t-1 border-black'/>
                    </div>
                    {/* Tabs */}
                    <div className='pb-10'>
                        <p className='lg:text-2xl md:text-md font-bold pb-5'>Amenities</p>
                        <PLTabs facilities={facilities} unitFeatures={unitFeatures}/>                   
                    </div>
                </div>
                {/* Footer */}
                <Footer />
            </>
        )
    }
    return (
        displayPropertyListingUI()
    );
}

export default SellerViewPropertyListingUI;