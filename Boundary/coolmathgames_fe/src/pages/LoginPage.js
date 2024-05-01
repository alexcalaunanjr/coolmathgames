import React, { useEffect, useState } from 'react';
import CustomDropdown from '../components/Dropdown';
import Button from '../components/Button';
import Image from '../assets/loginui.jpg'
import { useNavigate } from 'react-router-dom';
import { TextInput } from 'flowbite-react';
import axios from 'axios';

function LoginUI(props) {
    const [selectedUserType, setSelectedUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setUserEmail] = useState('');
    const [error, setError] = useState('');
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Login Page';
        axios.get('http://127.0.0.1:5000/login')
            .then(response => {
                const activeProfiles = response.data.filter(item => item.status === 'active');
                setOptions(Object.values(activeProfiles.map(item => (item.profile))));
            })
            .catch(error => {
                console.error('Error fetching user profiles:', error);
            });
    }, []);

    const handleSelect = (selectedItem) => {
        setSelectedUserType(selectedItem);
    };

    function sendLoginInfo(event) {
        event.preventDefault();

        // Validate username and password
        if (!username || !password || !selectedUserType) {
            displayErrorMessage();
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
                
                if (response.data.access_token) {
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
                }
                else {
                    displayErrorMessage();
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                displayErrorMessage();
            });
        } catch (error) {
            setError('An error occurred during login');
        }
    };

    function displayErrorMessage(){
        if (!username || !password || !selectedUserType) {
            setError('Please enter both username and password.');
            return;
        }
        else{
            setError('An error occurred during login');
            alert("Invalid Credentials");
        }
    }

    function displayLoginUI(){
        // Login Page
        return(
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side */}
            <div className="w-1/2 flex mx-auto">
                <img src={Image} alt="logo" className="w-full h-full object-cover" />
            </div>
            {/* Right side */}
            <div className="w-1/2 flex flex-col mx-auto justify-center items-center">
                <div className="text-4xl text-center font-bold pb-10 w-1/2 mx-auto">
                    <h1>Welcome to <span style={{ fontFamily: 'limelight' }}>MICASA</span></h1>
                </div>
                {/* Dropdown */}
                <div className="mb-4 w-1/2 mx-auto">
                    Login As
                    <CustomDropdown label="Select User Profile" options={options} onSelect={handleSelect} />
                </div>
                {/* Username */}
                <div className="mb-4 w-1/2 mx-auto">
                    Username
                    <TextInput
                        id = "username"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                {/* Password */}
                <div className="mb-4 w-1/2 mx-auto">
                    Password
                    <TextInput
                        id = "password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {/* Error message */}
                <div className="mb-4 w-1/2 mx-auto text-center text-red-500">
                    {error}
                </div>
                <div className="mb-20 w-1/2 mx-auto">
                    <Button color="bg-brown" text="Login" onClick={sendLoginInfo} />
                </div>
            </div>
        </div>
        )
    }

    return (
        displayLoginUI()
    );
}

export default LoginUI;
