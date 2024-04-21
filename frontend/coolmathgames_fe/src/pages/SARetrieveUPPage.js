import React from "react";
import { Label, TextInput } from "flowbite-react";
import Button from "../components/Button";
import { HiPlusSm } from "react-icons/hi";
import UserSearchBar from "../components/UserSearchBar";
import UPCard from "../components/UPCard";

// Testing
const profile1 = {
    name: "REA"
};

const profile2 = {
    name: "Buyer"
};

const profile3 = {
    name: "Seller"
};

const profile4 = {
    name: "System Admin"
};

const profiles = [profile1, profile2, profile3, profile4];

function SARetrieveUPPage() {

    // Function to handle search
    const handleSearch = (query) => {
        // Search logic
        console.log("Searching for:", query);
    };

    return (       
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
                    <div className="w-60 mx-auto">
                        <Button color="bg-blue-500" text="Add User Profile" icon={<HiPlusSm />}/>
                    </div>
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
    );
}

export default SARetrieveUPPage;