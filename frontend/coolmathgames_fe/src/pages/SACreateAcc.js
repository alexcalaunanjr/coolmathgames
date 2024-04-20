import React, { useState } from "react";
import CustomDropdown from '../components/Dropdown';
import Input from "../components/Input";
import UploadFile from "../components/UploadFile";
import InputEmail from "../components/InputEmail"
import Button from "../components/Button";

function SACreateAcc() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handlePhoneNumber = (e) => {
        const inputPhoneNumber = e.target.value;
        if (/^\d+$/.test(inputPhoneNumber)) {
            setPhoneNumber(inputPhoneNumber);
            setError('');
        } else {
            setError('Please enter only numbers in the phone number field.');
        }
    } 

    const [selectedUserType, setSelectedUserType] = useState('');

    const handleSelect = (selectedItem) => {
        setSelectedUserType(selectedItem);
    };

    const options = ["Buyer", "Seller", "Real Estate Agent"];

    return (
        // SA Create Account Page
        <div className="flex flex-col h-screen">
            <div className="flex w-full text-2xl font-bold p-10">
                <h1>User Account Details</h1>
            </div>
            <div className="flex">
                {/* Left side */}
                <div className="w-1/2 pl-10">
                    {/* Full Name */}
                    <div className="mb-8 w-2/3">
                        Full Name
                        <Input
                            type="text"
                            placeholder="Mi Casa"
                        />
                    </div>
                    {/* Username */}
                    <div className="mb-8 w-2/3">
                        Username
                        <Input
                            type="text"
                            placeholder="Micasa2024"
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-8 w-2/3">
                        Password
                        <Input
                            type="password"
                            placeholder="Use strong password"
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-8 w-2/3">
                        Email
                        <InputEmail
                            type="email"
                        />
                    </div>
                </div>
                {/* Right side */}
                <div className="w-1/2">
                    {/* Phone */}
                    <div className="mb-8 w-2/3">
                        Phone
                        <Input
                            type="text"
                            placeholder="80123456"
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                        />
                    </div>
                    {/* Type */}
                    <div className="mb-8 w-2/3">
                        Type
                        <CustomDropdown label="Select User Profile" options={options} onSelect={handleSelect} />
                    </div>
                    {/* Upload Image  */}
                    <div className="mb-4 w-full">
                        Upload Image
                        <div className="flex w-1/3 items-center justify-center">
                            <UploadFile />
                        </div>
                    </div>
                    {/* Button */}
                    <div className="mb-8 w-2/3 pt-20">
                        <Button color="bg-brown" text="Login" onClick={"q"} />
                    </div>
                </div>
            </div>
            {/* Error Message */}
            <div>
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
    );
}

export default SACreateAcc;