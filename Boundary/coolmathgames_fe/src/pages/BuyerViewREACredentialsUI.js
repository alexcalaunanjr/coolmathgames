import React, { useState, useEffect } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import { FaStar } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// assets
import bgCredential from "../assets/bgCredentials.png";
import Agent1 from '../assets/agent1.jpg'
// components
import BuyerHeader from "../components/BuyerHeader";
import Footer from "../components/Footer";
import BuyerRetrieveREARatingsUI from '../components/BuyerRetrieveREARatingsUI';
import BuyerRetrieveREAReviewsUI from '../components/BuyerRetrieveREAReviewsUI';


function BuyerViewREACredentialsUI(props, {openModal, onClose}) {
    // REA credentials depend on which REA buyer clicks on
    const username = localStorage.getItem('username');

    const [picture, setPicture] = useState(Agent1);
    const [fullName, setFullName] = useState('poopypants');
    const [email, setEmail] = useState('pookie@gmail.com');
    const [phoneNo, setPhoneNo] = useState('12345678');
    const [experience, setExperience] = useState('10');
    const [memberSince, setMemberSince] = useState('01/01/2015');
    const [license, setLicense] = useState('1L0V3Y0U');
    const [language, setLanguage] = useState('Mandarin, English');
    const [service, setService] = useState('service 1, service 2');
    const [about, setAbout] = useState("I'm Kevin Aldrin Tan, your friendly neighbourhood real estate aficionado");
    const [awards, setAwards] = useState('Daesang 1, MMA 2');

    // handle popups
    const [openRetrieveRatingsModal, setOpenRetrieveRatingsModal] = useState(false);
    const [openRetrieveReviewsModal, setOpenRetrieveReviewsModal] = useState(false);

    const navigate = useNavigate();

    const handleRatingsClick = () => {
        setOpenRetrieveRatingsModal(true);
    };
    const closeRetrieveRatingsModal = () => {
        setOpenRetrieveRatingsModal(false);
    };
    const handleReviewsClick = () => {
        setOpenRetrieveReviewsModal(true);
    };
    const closeRetrieveReviewsModal = () => {
        setOpenRetrieveReviewsModal(false);
    };

    useEffect(() => {
        document.title = 'Buyer View REA Credentials';
        
        axios.get(`http://127.0.0.1:5000/BuyerViewREACredential/${username}`, {
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
                setMemberSince(response.data.cred.memberSince)
                setLicense(response.data.cred.license)
                setLanguage(response.data.cred.language)
                setService(response.data.cred.service)
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

    // set services and awards listed to be in bulletpoints
    function bulletPoints(list) {
        if (!list) return null;
            const items = list.split(',').map((item, index) => (
                <li key={index} className="list-disc ml-4">{item.trim()}</li>
            ));
        return <ul className="list-inside">{items}</ul>;
    }


    function displayREACredentialsUI(){
        return(
            <>
            <UserContextProvider><BuyerHeader /></UserContextProvider>
    
            <div className="rounded-xl bg-gray-50 shadow-2xl m-12 xl:m-24">
                <div className='p-10'></div>
                
                <div className='flex outline outline-2 outline-gray-400 rounded-2xl justify-center mx-12 xl:mx-20 px-7 py-16' style={{ backgroundImage: `url(${bgCredential})` }} >
                    <div className='grid md:grid-cols-12 w-full md:gap-x-4'>
    
                        {/* profile picture */}
                        <div className='md:col-span-4 lg:col-span-3 place-self-center'>
                            <img src={picture} className='rounded-full w-40 h-40 md:w-48 md:h-48' />
                        </div>
    
                         {/* credentials */}
                        <div className='md:col-span-8 lg:col-span-9 '>
                            <div className='flex justify-center lg:justify-start mt-5 md:mt-0'>
                                <p class="text-2xl font-bold mb-10">{fullName}</p>
                            </div>
                            <div className='lg:flex md:grid-cols-12 md:col-span-8 lg:col-span-7 gap-x-10'>
                                <div className='md:col-span-8 lg:col-span-4'>
                                    {/* email */}
                                    <div className='flex break-words justify-center lg:justify-start '>
                                        <svg class="mr-2 mt-0.5 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                                        </svg>
                                        <div className='w-56'>
                                            <p>{email}</p>
                                        </div>
                                    </div>

                                    <div className='p-0.5'></div>
        
                                    {/* phone number */}
                                    <div className='flex break-words justify-center lg:justify-start '>
                                        <svg class="mr-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                        </svg>
                                        <div className='w-56'>
                                            <p>{phoneNo}</p>
                                        </div>
                                    </div>

                                    <div className='p-0.5'></div>
                                </div>
        
                                {/* additional information */}
                                <div className='flex justify-center lg:justify-start md:col-span-12 lg:col-span-3 break-words'>
                                    <div className='w-56'>
                                        <p><b>Experience:</b> {experience} years</p>
                                        <div className='p-0.5'></div>
                                        <p><b>Member since:</b> {memberSince}</p>
                                        <div className='p-0.5'></div>
                                        <p><b>License:</b> {license}</p>
                                        <div className='p-0.5'></div>
                                        <p><b>Language:</b> {language}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        
                    </div>
                </div>
    
                <div className='p-8'></div>
    
                {/* about me */}
                <div className='px-20'>
                    <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">About {fullName}</h1>
                    <p>{about}</p>
                </div>
    
                <div className='p-8'></div>
    
                <div className='grid grid-cols-12'>
                    {/* services */}
                    <div className='px-20 col-span-5'>
                        <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">Services</h1>
                        <p>{bulletPoints(service)}</p>
                    </div>
    
                    {/* awards */}
                    <div className='px-20 col-span-7'>
                        <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">Awards</h1>
                        <p>{bulletPoints(awards)}</p>
                    </div>
                </div>
    
                <div className='p-8'></div>
    
                {/* ratings & reviews */}
                <div className='px-20'>
                    <h1 class="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-[22pt]">Ratings & Reviews</h1>
                    <div className='flex'>
                        {/* rate button */}
                         <div className='flex w-1/2'>

                            <button type="button" className="flex w-full text-gray-900 border border-blue-700 hover:text-white hover:bg-blue-500 font-semibold text-lg rounded-lg px-5 py-2.5 me-2 mb-2 items-center justify-center" onClick={handleRatingsClick}>Rate
                                {/* <svg className="ml-1 mb-0.5 w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                                </svg> */}
                                <FaStar style={{width: "20px", height: "20px", marginLeft:'4px', marginBottom:'2px' }} />
                            </button>
                        </div>
                        {openRetrieveRatingsModal && (
                            <BuyerRetrieveREARatingsUI
                                openModal={BuyerRetrieveREARatingsUI}
                                onClose={closeRetrieveRatingsModal}
                                REAName={fullName}
                            />
                        )}

                        {/* review button */}
                        <div className='flex w-1/2'>
                            <button type="button" class="flex w-full text-gray-900 border border-blue-700 hover:text-white hover:bg-blue-500 font-semibold text-lg rounded-lg px-5 py-2.5 me-2 mb-2 items-center justify-center" onClick={handleReviewsClick}>Review
                                {/* <svg class="ml-1 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                                </svg> */}
                                <FaPencilAlt  style={{width: "20px", height: "20px", marginLeft:'4px', marginBottom:'2px' }}/>
                            </button>
                        </div>
                        {openRetrieveReviewsModal && (
                            <BuyerRetrieveREAReviewsUI
                                openModal={BuyerRetrieveREAReviewsUI}
                                onClose={closeRetrieveReviewsModal}
                                REAName={fullName}
                            />
                        )}
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
        displayREACredentialsUI()
    );
}
export default BuyerViewREACredentialsUI;