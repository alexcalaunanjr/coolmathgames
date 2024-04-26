import React, { useEffect, useState } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import SAHeader from '../components/SAHeader';
import { TextInput } from 'flowbite-react';
import Button from '../components/Button';
import axios from 'axios';

function SAUpdateUPPage() {
    const [profile, setProfile] = useState({
        userProfile:'',
        description:''
        });

        useEffect(() => {
            document.title = 'SA Create or Update User Profile';
            fetchUserProfile();
        }, []);

        const fetchUserProfile = () => {
            axios.get('http://127.0.0.1:5000/userProfile')
            .then(response => {
                setProfile({
                    userProfile: response.data.userProfile,
                    description: response.data.description
                });
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }

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
                        />
                    </div>
                    <div className="mb-10">
                        Description
                        <textarea
                            className="resize-y w-full h-40 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="Enter description..."
                        />
                    </div>
                </div>
                <div className="px-10 w-full mx-auto sm:w-1/2 md:w-1/2 lg:w-1/3">
                    <Button
                        color="bg-blue-500"
                        text="Save"
                    />
                </div>
            </div>
        </>
    )
}

export default SAUpdateUPPage;
