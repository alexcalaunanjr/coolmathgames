import React, { useState, useEffect } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import REAHeader from '../components/REAHeader';
import axios from 'axios';
import { TextInput, Textarea } from 'flowbite-react';
import Dropdown from '../components/Dropdown';
import UploadFile from '../components/UploadFile';
import { useNavigate, useParams} from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';

function REAUpdateListingUI(props) {
    const token = localStorage.getItem('');

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [bed, setBed] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
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

    let {propertyName} = useParams();

    useEffect(() => {
        document.title = 'REA Create Property';
        axios.get(`http://127.0.0.1:5000/REAUpdateListing/${propertyName}`, {
            headers: {
            'Authorization': 'Bearer ' + props.token,
            'Content-Type': 'application/json'
        }})
            .then(response => {
                setName(response.data.propertyName);
                setImage(response.data.propertyImage);
                setLocation(response.data.location);
                setPrice(response.data.price);
                setBed(response.data.noOfBedrooms);
                setBathroom(response.data.noOfBathrooms);
                setArea(response.data.area);
                setDescription(response.data.aboutProperty);
                setFeatures(response.data.unitFeatures);
                setFacilities(response.data.facilities);
                setStatus(response.data.sold?'Sold':'New');
            })
            .catch(error => {
                console.error('Error fetching property:', error);
            });
    }, []);

    // Handle select dropdown
    const handleSelectBed = (selectedItem) => {
        setBed(selectedItem);
    };
    // Handle select dropdown
    const handleSelectBath = (selectedItem) => {
        setBathroom(selectedItem);
    };
    // // Handle select dropdown
    const handleSelectStat = (selectedItem) => {
        setStatus(selectedItem);
    };

    // Navigation
    const navigate = useNavigate();
    // Handle cancel
    const handleCancel = () => {
        navigate('/REARetrieveListingListUI');
    }

    const handleImageUpload = (base64String) => {
        setImage(base64String)
    }

    // Handle update property
    const [changesPopUp, setChangesPopUp] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        setFormFilled(true);

        // Check for correct input
        if (!name || !location || !bed || !bathroom || !area || !price || !image || !facilities || !description || !features || !status || !/^\d+$/.test(area) || !/^\d+$/.test(price)) {
            displayErrorMessageUI();
            return;
        }

        try {
            axios.post(`http://127.0.0.1:5000/REAUpdateListing/${propertyName}`, {
                "propertyName": name,
                "propertyImage": image,
                "location": location,
                "noOfBedrooms": bed,
                "noOfBathrooms": bathroom,
                "area": area,
                "price": price,
                "facilities": facilities,
                "aboutProperty": description,
                "unitFeatures": features,
                "sold": status == "Sold"
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('Property updated successfully:', response.data.reaListingUpdated);
                if (response.data.reaListingUpdated) {
                    displayNewListingUI();
                }
                else {
                    setMessage('');
                    setError('Property not updated!');
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                setMessage('');
                setError('Property already exists')
            });
        } catch (error) {
            setError('An error occurred during property updation.');
        }

        {error === '' && setChangesPopUp(true)}
    };

    const handleReopenPopUp = () => {
        setChangesPopUp(false);
    }

    useEffect(() => {
        if (formFilled) {
            // Reset formFilled after validation
            setFormFilled(false);
        }
    }, [formFilled]);

    const displayNewListingUI = () =>{
        setMessage('Property updated successfully!');
        setError('');
    }

    const displayErrorMessageUI = () =>{
        // Check if all fields are filled
        if (!name || !location || !bed || !bathroom || !area || !price || !image || !facilities || !description || !features || !status || !/^\d+$/.test(area) || !/^\d+$/.test(price)) {
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

    function displayUpdateListingUI() {
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
                                value={name}
                                onChange = {(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* Location */}
                        <div className="mb-8 w-2/3">
                            Location
                            <TextInput
                                type="text"
                                value={location}
                                onChange = {(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className='flex mb-8 w-2/3'>
                            {/* Bed */}
                            <div className='w-1/3 pr-5'>
                                Bed
                                <Dropdown
                                    options={numbers}
                                    label={bed}
                                    onSelect={handleSelectBed}
                                />
                            </div>
                            {/* Bathroom */}
                            <div className='w-1/3 pr-5'>
                                Bathroom
                                <Dropdown
                                    options={numbers}
                                    label={bathroom}
                                    onSelect={handleSelectBath}
                                />
                            </div>
                            {/* Area */}
                            <div className="w-1/3">
                                Area
                                <TextInput
                                    type="text"
                                    value={area}
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
                                value={price}
                                onChange = {(e) => setPrice(e.target.value)}
                            />
                        </div>
                        {/* Upload Image */}
                        <div className="mb-8 w-2/3">
                            Image
                            <UploadFile image={image} setPicture={handleImageUpload}/>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className='w-1/2'>
                        {/* Facilities */}
                        <div className="mb-8 w-2/3">
                            Facilities
                            <Textarea
                                className='h-28'
                                type="text"
                                value={facilities}
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
                                value={description}
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
                                value={features}
                                placeholder="e.g. Air conditioning, Balcony, Fridge, Bathtub, Water heater"
                                onChange = {(e) => setFeatures(e.target.value)}
                            />
                        </div>
                        {/* Status */}
                        <div className="mb-8 w-1/3">
                            Status
                            <Dropdown
                                options={statusOption}
                                label={status}
                                onSelect={handleSelectStat}
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
                        <Button color="bg-blue-500 text-black text-md" text="Save Changes" onClick={handleSubmit}/>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
            </>
        );
    }

    return (
        displayUpdateListingUI()
    )
}

export default REAUpdateListingUI;