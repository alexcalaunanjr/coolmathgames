import React from "react";
import { useEffect } from 'react';
import { Label, TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';
import Button from "../components/Button";
import { HiPlusSm } from "react-icons/hi";
import UserSearchBar from "../components/UserSearchBar";
import SAHeader from '../components/SAHeader';
import UPCard from "../components/UPCard";
import { Link } from "react-router-dom";

// Testing
const profile1 = {
    id:1,
    name: "REA",
    description: "REA is a real estate company that provides property services."
};

const profile2 = {
    id:2,
    name: "Buyer",
    description: "A buyer is a person who purchases goods or services."
};

const profile3 = {
    id:3,
    name: "Seller",
    description: "A seller is a person who sells goods or services."
};

const profile4 = {
    id:4,
    name: "System Admin",
    description: "A system admin is a person who is responsible for managing a computer system."
};

const profiles = [profile1, profile2, profile3, profile4];

function SARetrieveUPPage() {
    useEffect(() => {
        document.title = 'SA User Profile';
    }, []);
    // Function to handle search
    const handleSearch = (query) => {
        // Search logic
        console.log("Searching for:", query);
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
                    <div className="w-1/4 text-2xl font-bold">
                        User Profiles ({profiles.length})
                    </div>
                    <div className="w-1/4 mx-auto">
                    </div>
                    <div className="w-1/4 mx-auto">
                        <UserSearchBar placeholder="Search by username" onSubmit={handleSearch}/>
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
                    {profiles.map((profile, index) => (
                        <UPCard key={index} profile={profile} />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default SARetrieveUPPage;