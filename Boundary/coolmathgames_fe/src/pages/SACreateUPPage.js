import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';

import Button from "../components/Button";
import SAHeader from "../components/SAHeader";
import { Link } from "react-router-dom";
import axios from 'axios';

function SACreateUPPage(props) {
    const [profileName, setProfileName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    // Flag to check if the form is filled
    const [formFilled, setFormFilled] = useState(false);
    const [profileCreated, setProfileCreated] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setFormFilled(true);

        // Check if all fields are filled
        if (!profileName) {
            setError('Please enter all fields.');
            return;
        }
        // If all checks pass, clear any previous errors and proceed with serverside profile creation

        try {
            axios.post('http://127.0.0.1:5000/createUserProfile', {
                "newProfile": profileName,
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('User profile created successfully:', response.data.profileCreated);
                if (response.data.profileCreated) {
                    setMessage('Account created successfully!');
                    setError('');
                }
                else {
                    setMessage('');
                    setError('Account not created!');
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                setMessage('');
                setError('User information not sent!');
            });
        } catch (error) {
            setError('There is a problem');
        }
    };

    useEffect(() => {
        document.title = 'SA Create Profile Page';
        if (formFilled) {
            // Reset formFilled after validation
            setFormFilled(false);
        }
    }, [formFilled]);

    return (
        <>
        <UserContextProvider><SAHeader /></UserContextProvider>
        {/* SA Create Account Page */}
        <div className="flex flex-col h-screen">
            <div className="flex w-full text-2xl font-bold p-10">
                <h1>User Profile Details</h1>
            </div>

            <div className=" flex w-1/2 pl-10">
                {/* New User Profile text */}
                <div className="mb-8 w-2/3">
                    New User Profile
                    <div>
                        <TextInput
                        type="text"
                        placeholder="Enter New User Profile "
                        onChange = {(e) => setProfileName(e.target.value)}
                        />
                        {/* Button */}
                        <div className="w-40 flex pt-5">
                            <Button color="bg-brown text-md" text="Create" onClick={handleSubmit}/>
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
        </div>
        </>
    );
}

export default SACreateUPPage;