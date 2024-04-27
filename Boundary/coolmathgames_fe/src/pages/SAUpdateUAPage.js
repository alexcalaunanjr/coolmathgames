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

function SAUpdateUAPage(props) {
    const token = localStorage.getItem('token');
    console.log('Current Token:', token);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');
    // This to get the image from db
    const [image, setImage] = useState(null);
    // Flag to check if the form is filled
    const [formFilled, setFormFilled] = useState(false);
    const [options, setOptions] = useState([]);
    // This takes the value from backend
    const [status, setStatus] = useState('Active');

    const [selectedUserType, setSelectedUserType] = useState('');

    useEffect(() => {
        document.title = 'SA Update Account Page';
        axios.get('http://127.0.0.1:5000/login')
            .then(response => {
                setOptions(response.data.user_profiles);
            })
            .catch(error => {
                console.error('Error fetching user profiles:', error);
            });
    }, []);

    const handleSelect = (selectedItem) => {
        setSelectedUserType(selectedItem);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setFormFilled(true);

        // Check if all fields are filled
        if (!username || !password || !selectedUserType || !email || !fullName || !phoneNumber) {
            setError('Please enter all fields.');
            return;
        }

        // Check if the password matches the confirm password
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Check if the phone number is in number format
        if (!/^\d+$/.test(phoneNumber)) {
            setError('Please enter only numbers in the phone number field.');
            return;
        }

        // If all checks pass, clear any previous errors and proceed with serverside account creation

        try {
            axios.post('http://127.0.0.1:5000/createUserAccount', {
                "fullName": fullName,
                "username": username,
                "password": password,
                "email": email,
                "phone": phoneNumber,
                "profile": selectedUserType
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('User account created successfully:', response.data);
                setError('');
                setMessage('Account created successfully!');
            })
            .catch((error) => {
                console.log(error, 'error');
                setMessage('');
                setError("User account already exists")
            });
        } catch (error) {
            setError('An error occurred during account creation.');
        }
    };

    useEffect(() => {
        if (formFilled) {
            // Reset formFilled after validation
            setFormFilled(false);
        }
    }, [formFilled]);

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
                            onChange = {(e) => setFullName(e.target.value)}
                        />
                    </div>
                    {/* Username */}
                    <div className="mb-8 w-2/3">
                        Username
                        <TextInput
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-8 w-2/3">
                        Password
                        <TextInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* 2nd Password */}
                    <div className="mb-8 w-2/3">
                        Confirm Password
                        <TextInput
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-8 w-2/3">
                        Email
                        <TextInput 
                            type="text" 
                            icon={HiMail}
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                        <CustomDropdown 
                            label={selectedUserType} 
                            options={options} 
                            onSelect={handleSelect} 
                        />
                    </div>
                    {/* Upload Image  */}
                    <div className="mb-4 w-full">
                        Upload Image
                        <div className="flex w-1/3 items-center justify-center">
                            <UploadFile />
                        </div>
                        {/* Error Message */}
                        <div>
                            {error && <div id="failedPrompt" className="text-red-500 pt-10">{error}</div>}
                        </div>
                        {/* Succsful Message */}
                        <div id="successPrompt" className="text-green-500 pt-10">
                            {error === '' && message}
                        </div>
                    </div>
                </div>
            </div>
            {/* Button */}
            <div className="flex w-full">
                <div className="w-40 mx-auto pt-5">
                    <Link to="/SAUpdateUA">
                        <Button color="bg-brown text-md" text="Save Changes" onClick={handleSubmit}/>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

export default SAUpdateUAPage;