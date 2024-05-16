import React, { useEffect, useState } from "react";
import { TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';
import { HiMail } from "react-icons/hi";
import Button from "../components/Button";
import SAHeader from '../components/SAHeader';
import SASuspendUAUI from "../components/SASuspendUAUI";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Agent1 from '../assets/agent1.jpg'

function SAViewUAUI(props, {openModal, onClose}) {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // password should not be displayed
    const password = '';
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('');
    // This takes the value from backend
    const [status, setStatus] = useState('');
    // This takes the value from backend
    const [selectedUserType, setSelectedUserType] = useState('');
    // Pop up for suspending account
    const [suspendPopUp, setSuspendPopUp] = useState(false);
    const [Ptoken, setPToken] = useState('');
    // Navigate to update account page
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/SAUpdateUAUI');
    };

    useEffect(() => {
        document.title = 'View User Account';
        const user = localStorage.getItem('clickedUser')
        axios.get(`http://127.0.0.1:5000/SAViewUA/${user}`, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setPToken(props.token)
            const userData = response.data;
            setData(userData);
        })
        .catch(error => {
            console.error('Error fetching user account:', error);
        });
    }, []);

    function setData(data){
        setFullName(data.fullName);
        setPhoneNumber(data.phoneNo);
        setUsername(data.username);
        setEmail(data.email);
        setStatus(data.status.toUpperCase());
        setSelectedUserType(data.profile);
        setImage(data.img)
    }

    const handleSuspend = () => {
        setSuspendPopUp(true);
      };

    const handleReopenPopUp = () => {
        setSuspendPopUp(false);
    }

    // Function to handle status color
    const statusColor = (status) => {
        if (status.toLowerCase() === "active") {
            return "text-green-400";
        }
        else {
            return "text-red-400";
        }
    }

    function displayUserAccountDetails(){
        return (
            <>
            {/* buyer header component */}
            <UserContextProvider><SAHeader /></UserContextProvider> 
            <div className="flex flex-col">
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
                                value={fullName}
                                readOnly
                            />
                        </div>
                        {/* Username */}
                        <div className="mb-8 w-2/3">
                            Username
                            <TextInput
                                type="text"
                                value={username}
                                readOnly
                            />
                        </div>
                        {/* Password */}
                        <div className="mb-8 w-2/3">
                            Password
                            <TextInput
                                type="password"
                                value={password}
                                readOnly
                            />
                        </div>
                        {/* Email */}
                        <div className="mb-8 w-2/3">
                            Email
                            <TextInput 
                                type="text" 
                                value={email}
                                icon={HiMail}
                                readOnly
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
                                value={phoneNumber}
                                readOnly
                            />
                        </div>
                        <div className="mb-8 w-2/3">
                            Status
                            <TextInput
                                style={{color: status.toLowerCase() === 'active' ? '#22C55E' : '#EF4444'}}
                                type="text"
                                value={status}
                                readOnly
                            />
                        </div>
                        {/* Type */}
                        <div className="mb-8 w-2/3">
                            Type
                            <TextInput
                                type="text"
                                value={selectedUserType}
                                readOnly
                            />
                        </div>
                        {/* Upload Image */}
                        <div className="mb-4 w-full">
                            Upload Image
                            <div className="flex w-1/3 items-center">
                                {image ? (
                                    <img src={`data:image/jpeg;base64, ${image}`} alt="Uploaded" className="w-20 h-20 rounded-full" />
                                ) : (
                                    <p className="text-gray-500">No picture uploaded</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Button */}
                <div className="flex justify-center space-x-4 pt-14">
                    <div className="w-40">
                        <Button color="bg-blue-500 text-md" text="Update" onClick={handleNavigate}/>
                    </div>
                    <div className="w-40">
                        <Button color="bg-red-700 text-black text-md" text="Suspend" onClick={handleSuspend}/>
                    </div>
                    {suspendPopUp && (
                    <SASuspendUAUI
                        openModal={SASuspendUAUI}
                        onClose={handleReopenPopUp}
                        text="Are you sure to suspend this user account?"
                        token={Ptoken}
                    />
                )}
                </div>
            </div>
            </>
        )
    }
    
    return(
        displayUserAccountDetails()
    )

}

export default SAViewUAUI;