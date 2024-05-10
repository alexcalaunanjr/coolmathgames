import React, { useState, useEffect } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import REAHeader from '../components/REAHeader';
import axios from 'axios';
import { TextInput, Textarea } from 'flowbite-react';
import Dropdown from '../components/Dropdown';
import UploadFile from '../components/UploadFile';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';

function REACreateLisitngUI(props) {
    const token = localStorage.getItem('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [bed, setBed] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [seller, setSeller] = useState('');
    const [facilities, setFacilities] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [status, setStatus] = useState('');
    // Flag to check if the form is filled
    const [formFilled, setFormFilled] = useState(false);

    // Error handling
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); 

    // Numbers
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const statusOption = ['New', 'Sold']

    useEffect(() => {
        document.title = 'REA Create Listing';

    }, []);

    // Handle select dropdown
    const handleSelect = (selectedItem) => {
        setBed(selectedItem);
        setBathroom(selectedItem);
        setStatus(selectedItem);
    };

    // Navigation
    const navigate = useNavigate();
    // Handle cancel
    const handleCancel = () => {
        navigate('/REARetrieveListingListUI');
    }

    // Handle create property
    function handleSubmit(event) {
        event.preventDefault();
        setFormFilled(true);

        // Check for correct input
        if (!name || !location || !bed || !bathroom || !area || !price || !image || !seller || !facilities || !description || !features || !/^\d+$/.test(area) || !/^\d+$/.test(price)) {
            displayErrorMessageUI();
            return;
        }

        try {
            axios.post('http://127.0.0.1:5000/REACreateListing', {
                "propertyName": name,
                "propertyImage": image,
                "location": location,
                "noOfBedrooms": bed,
                "noOfBathrooms": bathroom,
                "area": area,
                "price": price,
                "ownerSeller": seller,
                "facilities": facilities,
                "aboutProperty": description,
                "unitFeatures": features,
                "status": status,
                "REA" : localStorage.getItem("username")
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('Property created successfully:', response.data.propertyCreated);
                if (response.data.propertyCreated) {
                    displayNewListingUI();
                }
                else {
                    setMessage('');
                    setError('Property not created!');
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                setMessage('');
                setError('Property already exists')
            });
        } catch (error) {
            setError('An error occurred during property creation.');
        }
    };

    useEffect(() => {
        if (formFilled) {
            // Reset formFilled after validation
            setFormFilled(false);
        }
    }, [formFilled]);

    const handleImageUpload = (base64String) => {
        setImage(base64String);
    }

    const displayNewListingUI=() => {
        setMessage('Property created successfully!');
        setError('');
    }

    const displayErrorMessageUI=() => {
        // Check if all fields are filled
        if (!name || !location || !bed || !bathroom || !area || !price || !image || !seller || !facilities || !description || !features) {
            setError('Please enter all fields.');
        }

        // Check if the password matches the confirm password
        else {
            // Check if the area is in number format
            if (!/^\d+$/.test(area)) {
                setError('Please enter only numbers in the area field.');
            }
            else{
                // Check if the phone number is in number format
                if (!/^\d+$/.test(price)) {
                    setError('Please enter only numbers in the price field.');
                }
            }
        }
    }

    function displayCreateListingUI() {
        return (
            <>
            {/* Header */}
            <UserContextProvider><REAHeader /></UserContextProvider>

            <div className='flex-col'>
                <div className="flex w-full text-2xl font-bold p-10">
                    <h1>Property Details</h1>
                </div>
                <div className='flex pl-10'>
                    {/* Left side */}
                    <div className='w-1/2'>
                        {/* Name */}
                        <div className="mb-8 w-2/3">
                            Name
                            <TextInput
                                type="text"
                                onChange = {(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* Location */}
                        <div className="mb-8 w-2/3">
                            Location
                            <TextInput
                                type="text"
                                onChange = {(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className='flex mb-8 w-2/3'>
                            {/* Bed */}
                            <div className='w-1/3 pr-5'>
                                Bed
                                <Dropdown
                                    options={numbers}
                                    onSelect={handleSelect}
                                />
                            </div>
                            {/* Bathroom */}
                            <div className='w-1/3 pr-5'>
                                Bathroom
                                <Dropdown
                                    options={numbers}
                                    onSelect={handleSelect}
                                />
                            </div>
                            {/* Area */}
                            <div className="w-1/3">
                                Area
                                <TextInput
                                    type="text"
                                    placeholder="1000 sqft"
                                    onChange = {(e) => setArea(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Price */}
                        <div className="mb-8 w-2/3">
                            Price
                            <TextInput
                                type="text"
                                onChange = {(e) => setPrice(e.target.value)}
                            />
                        </div>
                        {/* Upload Image */}
                        <div className="mb-8 w-2/3">
                            <UploadFile setPicture={handleImageUpload}/>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className='w-1/2'>
                        {/* Seller */}
                        <div className="mb-8 w-2/3">
                            Seller
                            <TextInput
                                type="text"
                                onChange = {(e) => setSeller(e.target.value)}
                            />
                        </div>
                        {/* Facilities */}
                        <div className="mb-8 w-2/3">
                            Facilities
                            <Textarea
                                className='h-28'
                                type="text"
                                placeholder="e.g. Swimming Pool, Gym, BBQ Pit, Tennis Court"
                                onChange = {(e) => setFacilities(e.target.value)}
                            />
                        </div>
                        {/* Description */}
                        <div className="mb-8 w-2/3">
                            About This Property
                            <Textarea
                                className='h-28'
                                type="text"
                                placeholder="e.g. The place is near the MRT station and has a beautiful view. 5 minutes walk to the nearest mall. 2 minutes walk to the nearest bus stop."
                                onChange = {(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {/* Features */}
                        <div className="mb-8 w-2/3">
                            Unit Features
                            <Textarea
                                className='h-28'
                                type="text"
                                placeholder="e.g. Air conditioning, Balcony, Fridge, Bathtub, Water heater"
                                onChange = {(e) => setFeatures(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='pt-10'>
                    {/* Error Message */}
                    <div>
                        {error && <div id="failedPrompt" className="text-red-500 text-center">{error}</div>}
                    </div>
                    {/* Succsful Message */}
                    <div id="successPrompt" className="text-green-500 text-center">
                        {error === '' && message}
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-center space-x-4 p-10">
                    <div className="w-40">
                        <Button color="bg-red-500 text-black text-md" text="Cancel" onClick={handleCancel}/>
                    </div>
                    <div className="w-40">
                        <Button color="bg-blue-500 text-black text-md" text="Create" onClick={handleSubmit}/>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
            </>
        );
    }

    return (
        displayCreateListingUI()
    )
}

export default REACreateLisitngUI;