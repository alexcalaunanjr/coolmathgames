import React, { useEffect, useState } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import SAHeader from '../components/SAHeader';
import { TextInput } from 'flowbite-react';
import Button from '../components/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SAUpdateUPPage(props) {
    const [profileName, setProfileName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [formFilled, setFormFilled] = useState(false);

    useEffect(() => {
        document.title = 'SA Update User Profile';
        if (formFilled) {
            setFormFilled(false);
        }
    }, [formFilled]);

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
            axios.post('http://127.0.0.1:5000/updateUserProfile', {
                "newProfile": profileName,
                "newDescription": description
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('User profile updated successfully:', response.data.profileCreated);
                if (response.data.profileCreated) {
                    setMessage('Account updated successfully!');
                    setError('');
                }
                else {
                    setMessage('');
                    setError('Account not updated!');
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                setMessage('');
                setError('User updated information not sent!');
            });
        } catch (error) {
            setError('There is a problem');
        }
    };

    return (
        <>
            {/* Buyer header component */}
            <UserContextProvider>
                <SAHeader />
            </UserContextProvider>
            <div className="flex-column">
                <div className="w-full text-2xl font-bold p-10">
                    <h1>User Account Details</h1>
                </div>
                <div className="lg:w-2/5 md:w-1/2 px-10 mb-10">
                    <div className="mb-10">
                        User Profile
                        <TextInput
                            type="text"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-10">
                        Description
                        <textarea
                            className="resize-y w-full h-40 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                {/* Error Message */}
                <div className="flex justify-center">
                    {error && <div id="failedPrompt" className="text-red-500 pt-10">{error}</div>}
                </div>
                {/* Succesful Message */}
                <div className="flex justify-center">
                    <div id="successPrompt" className="text-green-500 pt-10">
                        {error === '' && message}
                    </div>
                </div>
                <div className="px-10 w-full mx-auto sm:w-1/2 md:w-1/2 lg:w-1/3">
                    <Button
                        color="bg-blue-500"
                        text="Save Changes"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </>
    )
}

export default SAUpdateUPPage;
