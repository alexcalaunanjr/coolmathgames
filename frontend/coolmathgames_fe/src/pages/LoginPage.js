import React, { useEffect, useState } from 'react';
import CustomDropdown from '../components/Dropdown';
import Button from '../components/Button';
import Image from '../assets/loginui.jpg'
import { authenticateUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { TextInput } from 'flowbite-react';
import axios from 'axios';

function LoginPage(props) {
    const [selectedUserType, setSelectedUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setUserEmail] = useState('');
    const [error, setError] = useState('');
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

        // Validate username and password
        if (!username || !password || !selectedUserType) {
            setError('Please enter both username and password.');
            return;
        }
        try {
            console.log("Username:", username);
            console.log("Password:", password);
            console.log("Selected User Type:", selectedUserType);
            axios.post('http://127.0.0.1:5000/login', {
                username: username,
                password: password,
                profile: selectedUserType
            }, {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                props.setToken(response.data.access_token)
                //setting profile and username to local storage to be retrieved
                localStorage.setItem('profile', selectedUserType);
                localStorage.setItem('username', username);
                
                if (response.data.authenticated) {
                    if (selectedUserType == 'System Admin') {
                        window.location.href = "/SAHomePage";
                    }
                    else if (selectedUserType == 'Real Estate Agent') {
                        window.location.href = "/REAHomePage";
                    }
                    else if (selectedUserType == 'Buyer') {
                        window.location.href = "/BuyerHomePage";
                    }
                    else if (selectedUserType == 'Seller') {
                        window.location.href = "/SellerHomePage";
                    }
                } else {
                    alert("Invalid Credentials (front end)")
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                alert("Invalid Credentials (front end)");
            });
        } catch (error) {
            setError('An error occurred during login');
        }
    };

    return (
        // Login Page
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side */}
            <div className="w-1/2 flex justify-center items-center">
                <img src={Image} alt="logo" className="w-full h-full object-cover" />
            </div>
            {/* Right side */}
            <div className="w-1/2 flex flex-col justify-center items-center px-40">
                <div className="text-4xl font-bold pb-20">
                    <h1>Welcome to <span style={{ fontFamily: 'limelight' }}>MICASA</span></h1>
                </div>
                {/* Dropdown */}
                <div className="mb-4 w-full">
                    Login As
                    <CustomDropdown label="Select User Profile" options={options} onSelect={handleSelect} />
                </div>
                {/* Username */}
                <div className="mb-4 w-full">
                    Username
                    <TextInput
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                {/* Password */}
                <div className="mb-4 w-full">
                    Password
                    <TextInput
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {/* User Type */}
                <div className="mb-4 text-red-500">
                    {error}
                </div>
                <div className="mb-20 w-full">
                    <Button color="bg-brown" text="Login" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
