import React, { useState, useEffect } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import axios from 'axios'

import REAHeader from "../components/REAHeader";
import Footer from "../components/Footer";

import bgCredential from "../assets/bgCredentials.png";

import { useNavigate } from "react-router-dom";

import Agent1 from '../assets/agent1.jpg'

function REAViewREACredentialsUI(props) {
    const username = localStorage.getItem('username');

    const [picture, setPicture] = useState(Agent1);
    const [fullName, setFullName] = useState('poopypants');
    const [email, setEmail] = useState('pookie@gmail.com');
    const [phoneNo, setPhoneNo] = useState('12345678');
    const [experience, setExperience] = useState('10');
    const [license, setLicense] = useState('1L0V3Y0U');
    const [language, setLanguage] = useState('Mand, Eng');
    const [special, setSpecial] = useState('special 1, special2');
    // const [specialList, setSpecialList] = useState({special}).split(",");
    const [about, setAbout] = useState("I'm Kevin Aldrin Tan, your friendly neighbourhood real estate aficionado");
    const [awards, setAwards] = useState('Daesang 1, MMA 2');

    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/REAUpdateCredentialsUI`);
    }

    useEffect(() => {
        document.title = 'REA Update Profile Page';
        
        axios.get(`http://127.0.0.1:5000/viewREACredential/${username}`, {
        headers: {
            'Authorization': 'Bearer ' + props.token,
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            if (response) {
                // setPicture(Agent1)
                setFullName(response.data.account.fullName)
                setEmail(response.data.account.email)
                setPhoneNo(response.data.account.phoneNo)
                setExperience(response.data.cred.experience)
                setLicense(response.data.cred.license)
                setLanguage(response.data.cred.language)
                setSpecial(response.data.cred.special)
                setAbout(response.data.cred.about)
                setAwards(response.data.cred.award)
            }
            else {
            }
        })
        .catch(error => {
            console.error('Error fetching REA credentials:', error);
        });
    }, []);

    function displayUserCredentialsUI(){
        return(
            <>
            <UserContextProvider><REAHeader /></UserContextProvider>
    
            <div className="rounded-xl bg-gray-50 shadow-2xl m-12 xl:m-24">
                <div className='p-10'></div>
    
                <div className='flex outline outline-2 outline-gray-400 rounded-2xl justify-center mx-12 xl:mx-20 px-7 py-16' style={{ backgroundImage: `url(${bgCredential})` }} >
                    <div className='grid md:grid-cols-12 w-full md:gap-x-4'>
    
                        {/* profile picture */}
                        <div className='md:col-span-4 lg:col-span-3 place-self-center'>
                            <img src={picture} className='rounded-full w-40 md:w-48' />
                        </div>
    
                        {/* credentials */}
                        <div className='lg:flex md:col-span-8 lg:col-span-7 gap-x-10'>
                            <div className='md:col-span-8 lg:col-span-4'>
                                <div className='flex mt-5 md:mt-0'>
                                    <p class="text-2xl font-bold mb-10">{fullName}</p>
                                </div>
    
                                {/* email */}
                                <div className='flex'>
                                    <svg class="mr-2 mt-0.5 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                                    </svg>
                                    <p>{email}</p>
                                </div>
    
                                {/* phone number */}
                                <div className='flex'>
                                    <svg class="mr-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                    </svg>
                                    <p>{phoneNo}</p>
                                </div>
                            </div>
    
                            {/* additional information */}
                            <div className='md:flex md:center md:col-span-12 lg:col-span-3'>
                                <div className='lg:mt-[73px]'>
                                    <p>Experience: {experience} years</p>
                                    <p>Member since: 01/01/2015</p>
                                    <p>License: {license}</p>
                                    <p>Language: {language}</p>
                                </div>
                            </div>
                        </div>
    
                        {/* update button */}
                        <div className='md:col-span-12 lg:col-span-2 mt-10 lg:mt-0 text-center'>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleUpdateClick}>Update</button>
                        </div>
                    </div>
                </div>
    
                <div className='p-8'></div>
    
                {/* about me */}
                <div className='px-20'>
                    <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">About Me</h1>
                    <p>{about}</p>
                </div>
    
                <div className='p-8'></div>
    
                <div className='grid grid-cols-12'>
                    {/* specialties & services */}
                    <div className='px-20 col-span-5'>
                        <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">Services</h1>
                        <p>
                            {special}
                        </p>
                    </div>
    
                    {/* awards */}
                    <div className='px-20 col-span-7'>
                        <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">Awards</h1>
                        <p>
                            {awards}
                        </p>
                    </div>
                </div>
    
                <div className='p-8'></div>
    
                {/* ratings & reviews */}
                <div className='px-20'>
                    <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">Ratings & Reviews</h1>
                    <div>
                        {/* stars and rate score */}
                        <div class="flex">
                            {/* total rate */}
                            <p class="text-4xl text-gray-900">4.5</p>
    
                            {/* stars */}
                            <svg class="ms-1 mt-0.5 w-8 h-8 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        
                        <p class="text-sm font-medium text-gray-500">2 reviews</p>
                    </div>
    
                    <div className='p-5'></div>
                    
    
                    {/* people's ratings */}
                    <div>
                        <div className='flex'>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
    
                        <div className='p-1'></div>
                        
                        <div className='flex'>
                            <p className='font-semibold'>John Doe</p>
                            <p className='ms-5 opacity-70 italic'>30/04/2024</p>
                        </div>
    
                        <div className='p-1'></div>
    
                        <p>
                            Kevin did an amazing job with the sale of my father’s house. I am in overseas so I was concerned about how this process would go, 
                            but the way he handled our situation and went above and beyond for us was amazing.
                        </p>
                    </div>
    
                    <div className='p-4'></div>
    
    
                    <div>
                        <div className='flex'>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-6 h-6 text-gray-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
    
                        <div className='p-1'></div>
                        
                        <div className='flex'>
                            <p className='font-semibold'>Jane Doe</p>
                            <p className='ms-5 opacity-70 italic'>25/04/2024</p>
                        </div>
    
                        <div className='p-1'></div>
    
                        <p>
                            Kevin very wow. So professional. Hottie :3
                        </p>
                    </div>
                </div>
                <div className='p-10'></div>
            </div>
    
            <div className='p-10'></div>
    
            <Footer />
            </>
        )
    }

    return(
        displayUserCredentialsUI()
    );
}
export default REAViewREACredentialsUI;