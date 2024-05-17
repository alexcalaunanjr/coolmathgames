import React, { useEffect, useState } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import SAHeader from '../components/SAHeader';
import { TextInput } from 'flowbite-react';
import Button from '../components/Button';
import axios from 'axios';

function SAUpdateUPUI(props) {
    const [newDescription, setNewDescription] = useState('');
    const [newProfile, setNewProfile] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [formFilled, setFormFilled] = useState(false);

    const profileName = localStorage.getItem('clickedProfile') // query database using profile name

    useEffect(() => {
        document.title = 'Update User Profile';
        // if (formFilled) {
        //     setFormFilled(false);
        // };
        axios.get(`http://127.0.0.1:5000/SAUpdateUP/${profileName}`, {
            headers: {
            'Authorization': 'Bearer ' + props.token,
            'Content-Type': 'application/json'
        }})
            .then(response => {
                if (response) {
                    // setPicture(Agent1)
                    setNewProfile(response.data.profile)
                    setNewDescription(response.data.desc)
                }
                else {
                    setError('Profile not found!');
                    setMessage('');
                }
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, [profileName, props.token]);

    function handleUpdate(event) {
        event.preventDefault();
        setFormFilled(true);

        // Check if all fields are filled
        if (!newProfile) {
            setError('Please enter all fields.');
            return;
        }
        if (!newDescription) {
            setError('Please enter all fields.');
            return;
        }
        // If all checks pass, clear any previous errors and proceed with serverside profile creation

        try {
            axios.post(`http://127.0.0.1:5000/SAUpdateUP/${profileName}`, {
                "profile" : newProfile,
                "description": newDescription
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('User profile updated successfully:', response.data.updatedProfile);
                if (response.data.updatedProfile) {
                    displaySuccessMessage();
                    setNewProfile(response.data.updatedProfile.profile)
                    setNewDescription(response.data.updatedProfile.description)
                }
                else {
                    setMessage('');
                    displayErrorMessage();
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                displayErrorMessage();
            });
        } catch (error) {
            setError('There is a problem');
        }
    };

    function displayErrorMessage(){
        setMessage('');
        setError('User profile not updated!');
    }

    function displaySuccessMessage(){
        setMessage('User profile updated successfully!');
        setError('');
    }

    function displayUserProfileDetails(){
        return (
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
                        <div className="mb-10">
                            User Profile
                            <TextInput
                                type="text"
                                value={newProfile}
                                onChange={(e) => setNewProfile(e.target.value)} 
                            />
                        </div>
                        <div className="mb-10">
                            Description
                            <textarea
                                className="resize-y w-full h-40 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Error Message */}
                    <div className="flex justify-center">
                        {error && <div id="failedPrompt" className="text-red-500 pt-10">{error}</div>}
                    </div>
                    {/* Succesful Message */}
                    <div className="flex justify-center">
                        {error === '' && <div id="successPrompt" className="text-green-500 pt-10">{message}</div>}
                    </div>
                    <div className="w-40 mx-auto pt-5">
                        <Button
                            color="bg-blue-500"
                            text="Save Changes"
                            onClick={handleUpdate}
                        />
                    </div>
                </div>
            </>
        )
    }
    
    return(
        displayUserProfileDetails()
    );
}

export default SAUpdateUPUI;
