import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';

import Button from "../components/Button";
import SAHeader from "../components/SAHeader";
import axios from 'axios';

function SACreateUPUI(props) {
    const [profileName, setProfileName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    // Flag to check if the form is filled
    const [formFilled, setFormFilled] = useState(false);

    useEffect(() => {
        document.title = 'Create User Profile';
        if (formFilled) {
            // Reset formFilled after validation
            setFormFilled(false);
        }
    }, [formFilled]);

    function submitForm(event) {
        event.preventDefault();
        setFormFilled(true);

        // Check if all fields are filled
        if (!profileName || !description) {
            displayErrorMessageUI();
            return;
        }
        // If all checks pass, clear any previous errors and proceed with serverside profile creation

        try {
            axios.post('http://127.0.0.1:5000/SACreateUP', {
                "newProfile": profileName,
                "newDescription": description
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('User profile created successfully:', response.data.profileCreated);
                if (response.data.profileCreated) {
                    displayNewUserProfileUI();
                }
                else {
                    displayErrorMessageUI();
                    console.log(error, 'User profile not created!');
                }
            })
            .catch((error) => {
                displayErrorMessageUI();
                console.log(error, 'User information not sent!');
            });
        } catch (error) {
            displayErrorMessageUI();
            console.log(error, 'There is a problem');
        }
    };
    
    function displayNewUserProfileUI(){
        setMessage('User profile created successfully!');
        setError('');
    }

    function displayErrorMessageUI()
    {
        if (!profileName || !description) {
            setError('Please enter all fields.');
        }
        else{
            setMessage('');
            setError('User profile already exists!');
        }
    }

    function displayCreateUserProfileUI(){
        return(
                <>
                {/* Buyer header component */}
                <UserContextProvider>
                    <SAHeader />
                </UserContextProvider>
                <div className="flex-column">
                    <div className="w-full text-2xl font-bold p-10">
                        <h1>User Profile Details</h1>
                    </div>
                    <div className="lg:w-2/5 md:w-1/2 px-10 mb-10">
                        {/* New User Profile*/}
                        <div className="mb-10">
                            User Profile
                            <TextInput
                                type="text"
                                placeholder="Enter Profile Name"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)} 
                            />
                        </div>
                        {/* Description */}
                        <div className="mb-10">
                            Description
                            <textarea
                                className="resize-y w-full h-40 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                placeholder="Enter description here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Error Message */}
                    <div className="flex justify-center">
                        {error && <div id="failedPrompt" className="text-red-500">{error}</div>}
                    </div>
                    {/* Succesful Message */}
                    <div className="flex justify-center">
                        <div id="successPrompt" className="text-green-500">
                            {error === '' && message}
                        </div>
                    </div>
                    <div className="w-40 mx-auto pt-5">
                        <Button
                            color="bg-blue-500"
                            text="Create"
                            onClick={submitForm}
                        />
                    </div>
                </div>
            </>
        )
    }

    return (
        displayCreateUserProfileUI()
    )
}

export default SACreateUPUI;