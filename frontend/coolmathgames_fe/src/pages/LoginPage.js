import React, { useState } from 'react';
import CustomDropdown from '../components/Dropdown';
import Button from '../components/Button';
import Image from '../assets/loginui.jpg'
import { authenticateUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { TextInput } from 'flowbite-react';

function LoginPage() {
    const [selectedUserType, setSelectedUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSelect = (selectedItem) => {
        setSelectedUserType(selectedItem);
    };

    const options = ["Buyer", "Seller", "Real Estate Agent", "System Admin"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate username and password
        if (!username || !password || !selectedUserType) {
            setError('Please enter both username and password.');
            return;
        }
        try {
            const response = await authenticateUser(username, password);
            // Redirect to the appropriate page based on the user type
            if (response.success) {
                switch (selectedUserType) {
                    case 'Buyer':
                        history.push('/BuyerHomePage');
                        break;
                    case 'Seller':
                        history.push('/SellerHomePage');
                        break;
                    case 'Real Estate Agent':
                        history.push('/REAHomePage');
                        break;
                    case 'System Admin':
                        history.push('/SAHomePage');
                        break;
                    default:
                        history.push('/default');
                        break;
                }
            } else {
                setError('Invalid username or password! Please try again.');
            }
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
