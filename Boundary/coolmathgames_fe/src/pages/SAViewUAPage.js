import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';
import { HiMail } from "react-icons/hi";
import CustomDropdown from '../components/Dropdown';
import UploadFile from "../components/UploadFile";
import Button from "../components/Button";
import SAHeader from '../components/SAHeader';
import { Link } from "react-router-dom";
import axios from 'axios';

function SAViewUAPage(props) {
    const token = localStorage.getItem('token');
    console.log('Current Token:', token);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    // password should not be displayed
    const password = '';
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    // This takes the value from backend
    const [status, setStatus] = useState('Active');

    const [selectedUserType, setSelectedUserType] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
    };

    useEffect(() => {
        document.title = 'SA View Account Page';
        axios.get('http://127.0.0.1:5000/userProfile')
        .then(response => {
            const userData = response.data;
            setFullName(userData.fullName);
            setPhoneNumber(userData.phoneNumber);
            setUsername(userData.username);
            setEmail(userData.email);
            setStatus(userData.status);
            setSelectedUserType(userData.userType);
            setImage(userData.image);
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
    }, []);

    return (
        <>
        {/* buyer header component */}
        <UserContextProvider><SAHeader /></UserContextProvider> 
        <div className="flex flex-col h-screen">
            <div className="flex w-full text-2xl font-bold p-10">
                <h1>User Account Details</h1>
            </div>
            <div className="flex">
                {/* Left side */}
                <div className="w-1/2 pl-10">
                    {/* Full Name */}
                    <div className="mb-8 w-2/3">
                        Full Name
                        <TextInput
                            type="text"
                            value={fullName}
                            readOnly
                        />
                    </div>
                    {/* Username */}
                    <div className="mb-8 w-2/3">
                        Username
                        <TextInput
                            type="text"
                            value={username}
                            readOnly
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-8 w-2/3">
                        Password
                        <TextInput
                            type="password"
                            value={password}
                            readOnly
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-8 w-2/3">
                        Email
                        <TextInput 
                            type="text" 
                            value={email}
                            icon={HiMail}
                            readOnly
                        />
                    </div>
                </div>
                {/* Right side */}
                <div className="w-1/2">
                    {/* Phone */}
                    <div className="mb-8 w-2/3">
                        Phone
                        <TextInput
                            type="text"
                            value={phoneNumber}
                            readOnly
                        />
                    </div>
                    <div className="mb-8 w-2/3">
                        Status
                        <TextInput
                            style={{color: status === 'Active' ? 'green' : 'red'}}
                            type="text"
                            value={status}
                            readOnly
                        />
                    </div>
                    {/* Type */}
                    <div className="mb-8 w-2/3">
                        Type
                        <TextInput
                            type="text"
                            value={selectedUserType}
                            readOnly
                        />
                    </div>
                    {/* Upload Image */}
                    <div className="mb-4 w-full">
                        Upload Image
                        <div className="flex w-1/3 items-center">
                            {image ? (
                                <img src={image} alt="Uploaded" className="w-20 h-20 rounded-full" />
                            ) : (
                                <p className="text-gray-500">No picture uploaded</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Button */}
            <div className="flex justify-center space-x-4 pt-5">
                <div className="w-40">
                    <Link to="/updateAccount">
                        <Button color="bg-brown text-md" text="Update" onClick={handleSubmit}/>
                    </Link>
                </div>
                <div className="w-40">
                    <Link to="/SASuspendUA">
                        <Button color="bg-red-700 text-black text-md" text="Suspend" onClick={handleSubmit}/>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

export default SAViewUAPage;