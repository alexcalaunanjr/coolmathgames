import React from "react";
import { useEffect, useState } from 'react';
import { Label, TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';
import Button from "../components/Button";
import { HiPlusSm } from "react-icons/hi";
import UserSearchBar from "../components/UserSearchBar";
import SAHeader from '../components/SAHeader';
import UPCard from "../components/UPCard";
import { Link } from "react-router-dom";
import axios from 'axios';

function SARetrieveUPPage(props) {
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [clickedProfile, setClickedProfile] = useState('');
    const [clickedProfileDesc, setclickedProfileDesc] = useState('');
    const [Ptoken, setPToken] = useState('');

    useEffect(() => {
        document.title = 'SA User Profile';
        axios.get('http://127.0.0.1:5000/retrieveProfileList', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setPToken(props.token)
            const profileDict = response.data.profileNames
            displayProfileList(profileDict)
        })
        .catch(error => {
            console.error('Error fetching profile list', error);
        });
    }, []);

    useEffect(() => {
        if (clickedProfile) {
            localStorage.setItem('clickedProfile', clickedProfile)
            axios.post('http://127.0.0.1:5000/viewProfileDesc', {
                profileName: clickedProfile,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + props.token,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                const data = response.data.description
                setclickedProfileDesc(data)
            })
            .catch((error) => {
                console.error('Error fetching profile description', error);
            });
        }
    }, [clickedProfile]);

    function displayProfileList(profileDict) {
        const profilesData = profileDict.map(profile => ({
            profile: profile.profile,
            status: profile.status
        }))
        setProfiles(profilesData)
    }

    // Function to handle search
    const handleSearch = (query) => {
        // Search logic
        setSearchQuery(query);
    };

    const filteredProfiles = profiles.filter(profile => {
        return profile.profile.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Function to handle click on profile card
    const handleProfileClick = (profileName) => {
        setClickedProfile(profileName);
    };

    return (       
        <>
        {/* buyer header component */}
        <UserContextProvider><SAHeader /></UserContextProvider>
        <div>
            {/* Rounded box */}
            <div className="rounded-xl bg-gray-100 shadow-xl pb-60 m-20">
                {/* Top Heading */}
                <div className="flex w-full p-10">
                    <div className="mt-3 w-1/4 text-2xl font-bold">
                        User Profile List ({profiles.length})
                    </div>
                    <div className="w-1/4 mx-auto">
                    </div>
                    <div className="w-1/4 mx-auto">
                        <UserSearchBar placeholder="Search by profile" onSubmit={handleSearch}/>
                    </div>
                    <Link to="/SACreateProfile">
                        <div className="w-60 mx-auto">
                            <Button color="bg-brown" text="Add User Profile" icon={<HiPlusSm />}/>
                        </div>
                    </Link>
                </div>
                {/* User Profile Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10 items-center ">
                    {/* Map through the profiles array */}
                    {filteredProfiles.map((profile, index) => (
                        <UPCard key={index} profile={profile} onClick={handleProfileClick} profileDesc={clickedProfileDesc} token={Ptoken}/>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default SARetrieveUPPage;