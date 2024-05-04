import React from "react";
import { useEffect, useState } from 'react';
import { Label, TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';
import Button from "../components/Button";
import { HiPlusSm } from "react-icons/hi";
import SASearchUPUI from "../components/SASearchUPUI";
import SAHeader from '../components/SAHeader';
import SAViewUPUI from "../components/UPCard";
import { Link } from "react-router-dom";
import axios from 'axios';

function SARetrieveUPListUI(props) {
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [clickedProfile, setClickedProfile] = useState('');
    const [clickedProfileDesc, setclickedProfileDesc] = useState('');
    const [Ptoken, setPToken] = useState('');

    useEffect(() => {
        document.title = 'SA User Profile';
        axios.get('http://127.0.0.1:5000/SARetrieveUPList', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setPToken(props.token)
            const profileDict = response.data
            const profilesData = profileDict.map(profile => ({
                profile: profile.profile,
                status: profile.status
            }))
            setProfiles(profilesData)
        })
        .catch(error => {
            console.error('Error fetching profile list', error);
        });
    }, []);

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/SASearchUP', {
            "query": searchQuery
        },{
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.data.userProfile == "Not Found") {
                setProfiles([])
            }
            else {
                const profiles = response.data.userProfile;
                setProfiles(profiles)
            }
        })
        .catch(error => {
            console.error('Error fetching user profiles list', error);
        });
    }, [searchQuery]);

    useEffect(() => {
        if (clickedProfile) {
            localStorage.setItem('clickedProfile', clickedProfile)
        }
    }, [clickedProfile]);

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Function to handle click on profile card
    const handleProfileClick = (profileName) => {
        setClickedProfile(profileName);
        console.log(clickedProfile)
    };

    function displayUserProfileList() {
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
                            <SASearchUPUI placeholder="Search by profile" onSubmit={handleSearch}/>
                        </div>
                        <Link to="/SACreateUPUI">
                            <div className="lg:w-full  md:w-40 w-20 mx-auto">
                                <Button color="bg-blue-500" text="Add User Profile" icon={<HiPlusSm />}/>
                            </div>
                        </Link>
                    </div>
                    {/* User Profile Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10 items-center ">
                        {/* Map through the profiles array */}
                        {profiles.map((profile, index) => (
                            <SAViewUPUI key={index} profile={profile} onClick={handleProfileClick} profileDesc={clickedProfileDesc} token={Ptoken}/>
                        ))}
                    </div>
                </div>
            </div>
            </>
        )
    }
    
    return(
        displayUserProfileList()
    );
}

export default SARetrieveUPListUI;