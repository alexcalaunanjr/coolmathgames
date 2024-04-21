import React, { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import CustomDropdown from '../components/Dropdown';
import UploadFile from "../components/UploadFile";
import Button from "../components/Button";

function SACreateUAPage() {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');
    // Flag to check if the form is filled
    const [formFilled, setFormFilled] = useState(false);

    const [selectedUserType, setSelectedUserType] = useState('');

    const handleSelect = (selectedItem) => {
        setSelectedUserType(selectedItem);
    };

    const options = ["Buyer", "Seller", "Real Estate Agent"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormFilled(true);

        // Check if all fields are filled
        if (!username || !password || !selectedUserType || !email || !fullName || !phoneNumber) {
            setError('Please enter all fields.');
            return;
        }

        // Check if the password matches the confirm password
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Check if the phone number is in number format
        if (!/^\d+$/.test(phoneNumber)) {
            setError('Please enter only numbers in the phone number field.');
            return;
        }

        // If all checks pass, clear any previous errors and proceed with account creation
        else
        {
            setError('');
            setMessage('Account created successfully!');
        }

        try {
        } catch (error) {
            setError('An error occurred during account creation.');
        }
    };

    useEffect(() => {
        if (formFilled) {
            // Reset formFilled after validation
            setFormFilled(false);
        }
    }, [formFilled]);

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
                        <TextInput
                            type="text"
                            placeholder="Mi Casa"
                            onChange = {(e) => setFullName(e.target.value)}
                        />
                    </div>
                    {/* Username */}
                    <div className="mb-8 w-2/3">
                        Username
                        <TextInput
                            type="text"
                            placeholder="Micasa2024"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-8 w-2/3">
                        Password
                        <TextInput
                            type="password"
                            placeholder="Use strong password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* 2nd Password */}
                    <div className="mb-8 w-2/3">
                        Confirm Password
                        <TextInput
                            type="password"
                            placeholder="Use strong password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-8 w-2/3">
                        Email
                        <TextInput 
                            type="text" 
                            icon={HiMail} 
                            placeholder="name@email.com" 
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                {/* Right side */}
                <div className="w-1/2">
                    {/* Phone */}
                    <div className="mb-8 w-2/3">
                        Phone
                        <TextInput
                            type="text"
                            placeholder="80123456"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    {/* Type */}
                    <div className="mb-8 w-2/3">
                        Type
                        <CustomDropdown 
                            label="Select User Profile" 
                            options={options} 
                            onSelect={handleSelect} 
                        />
                    </div>
                    {/* Upload Image  */}
                    <div className="mb-4 w-full">
                        Upload Image
                        <div className="flex w-1/3 items-center justify-center">
                            <UploadFile />
                        </div>
                        {/* Error Message */}
                        <div>
                            {error && <div className="text-red-500 pt-10">{error}</div>}
                        </div>
                        {/* Button */}
                        <div className="w-40 flex pt-10">
                            <Button color="bg-brown text-md" text="Create" onClick={handleSubmit}/>
                        </div>
                        {/* Succsful Message */}
                        <div className="text-green-500 pt-10">
                            {error === '' && message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SACreateUAPage;