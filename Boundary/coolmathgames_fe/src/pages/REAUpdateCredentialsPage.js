import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

// components
import REAHeader from '../components/REAHeader'
import Button from '../components/Button'
import CustomDropdown from '../components/Dropdown'
import UploadFile from '../components/UploadFile'
import { TextInput, Textarea } from 'flowbite-react'

// hooks
import { UserContextProvider } from '../hooks/UseModalContext'

// assets
import Agent1 from '../assets/agent1.jpg'

export default function REAUpdateCredentialsPage(props) {

    // Create a Credential object
    const credentials = {
        id: '',
        username: 'niggerBalls2',
        picture: Agent1,
        name: 'Nigerian Balls',
        email: 'niggerballs69@nigger.com',
        phone: '69420',
        experience: 'Gaylord',
        license: 'N1GG3R',
        language: 'Cotton picking',
        specialties: 'Getting whipped',
        aboutMe: 'I am a slave',
        awards: 'Smallest black cock award (18 inches)',
    };

    // states for the form fields
    const [picture, setPicture] = useState(credentials.picture);
    const [fullName, setFullName] = useState(credentials.name);
    const [email, setEmail] = useState(credentials.email);
    const [phoneNumber, setPhoneNumber] = useState(credentials.phone);
    const [experience, setExperience] = useState(credentials.experience);
    const [license, setLicense] = useState(credentials.license);
    const [language, setLanguage] = useState(credentials.language);
    const [specialties, setSpecialties] = useState(credentials.specialties);
    const [aboutMe, setAboutMe] = useState(credentials.aboutMe);
    const [awards, setAwards] = useState(credentials.awards);

    // error states
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    

    // Flag to check if the form is filled
    const [formFilled, setFormFilled] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        document.title = 'SA Update Account Page';
        axios.get('http://127.0.0.1:5000/login')
            .then(response => {
                setOptions(response.data.user_profiles);
            })
            .catch(error => {
                console.error('Error fetching user profiles:', error);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        setFormFilled(true);

        console.log('Form Filled:', formFilled);
        console.log(!fullName)

        // Check if all fields are filled
        if (!fullName | !email || !phoneNumber) {
            setError('Please enter the required fields.');
            return;
        }

        // Check if the phone number is in number format
        if (!/^\d+$/.test(phoneNumber)) {
            setError('Please enter only numbers in the phone number field.');
            return;
        }

        // If all checks pass, clear any previous errors and proceed with serverside account creation
        try {
            axios.post('http://127.0.0.1:5000/', { // TODO: please put the correct endpoint :)))
                "id": "",
                "username": "",
                "picture": "",
                "name": "",
                "email": "",
                "phone": "",
                "experience": "",
                "license": "",
                "language": "",
                "specialties": "",
                "aboutMe": "",
                "awards": "",
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('REA Credentials updated successfully:', response.data);
                setError('');
                setMessage('Credentials updated successfully!');
            })
            .catch((error) => {
                console.log(error, 'error');
                setMessage('');
                setError("Bruh") // Might need to change this error message
            });
        } catch (error) {
            setError('An error occurred during the update process.');
        }
    };

    useEffect(() => {
        if (formFilled) {
            // Reset formFilled after validation
            setFormFilled(false);
        }
    }, [formFilled]);
    
    return (
        <>
            {/* REA header component */}
            <UserContextProvider><REAHeader /></UserContextProvider>
                <div className="flex flex-col h-screen">
                <div className="flex w-full text-2xl font-bold p-10">
                    <h1>User Credentials</h1>
                </div>
                <div className="flex">
                    {/* Left side */}
                    <div className="w-1/2 pl-10">
                        {/* Upload Image  */}
                        <div className="mb-4 w-full">
                            <p className="text-xl">Picture</p>
                            <div className="flex w-1/3 items-center pt-3">
                                <UploadFile picture={picture} setPicture={setPicture} />
                            </div>
                        </div>
                        {/* Specialties & Services */}
                        <div className="mb-8 w-2/3">
                            <p className="text-xl">Specialties & Services</p>
                            <Textarea
                                type="text"
                                value={specialties}
                                onChange={(e) => setSpecialties(e.target.value)}
                                style={{resize: 'none', height: '150px'}}
                            />
                        </div>
                        {/* About me */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">About Me</p>
                            <Textarea
                                type="text"
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                style={{resize: 'none', height: '150px'}}
                            />
                        </div>
                        {/* Awards */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">Awards</p>
                            <Textarea
                                type="text"
                                value={awards}
                                onChange={(e) => setAwards(e.target.value)}
                                style={{resize: 'none', height: '150px'}}
                            />
                        </div>
                    </div>




                    {/* Right side */}
                    <div className="w-1/2">
                        {/* Full Name */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">Name</p>
                            <TextInput
                                type="text"
                                value={fullName}
                                required
                                onChange = {(e) => setFullName(e.target.value)}
                                {...(error && !fullName.trim() && { color: 'failure' })}
                                {...(error && !fullName.trim() && { helperText: <>
                                    Required field!
                                  </> })}
                            />
                        </div>
                        {/* Email */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">Email</p>
                            <TextInput 
                                type="text" 
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                {...(error && !email.trim() && { color: 'failure' })}
                                {...(error && !email.trim() && { helperText: <>
                                    Required field!
                                  </> })}
                            />
                        </div>
                        {/* Phone */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">Phone</p>
                            <TextInput
                                type="text"
                                value={phoneNumber}
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                {...(error && !phoneNumber.trim() && { color: 'failure' })}
                                {...(error && !phoneNumber.trim() && { helperText: <>
                                    Required field!
                                  </> })}
                            />
                        </div>
                        {/* Experience */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">Experience</p>
                            <TextInput
                                // style={{color: status === 'Active' ? 'green' : 'red'}}
                                type="text"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </div>
                        {/* License */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">License</p>
                            <TextInput
                                type="text"
                                value={license}
                                onChange={(e) => setLicense(e.target.value)}
                            />
                        </div>
                        {/* Languages */}
                        <div className="mb-8 w-2/3">
                        <p className="text-xl">Languages</p>
                            <TextInput
                                type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </div>
                        {/* Error Message */}
                        <div>
                            {error && <div id="failedPrompt" className="text-red-500 pt-10">{error}</div>}
                        </div>
                        {/* Succsful Message */}
                        <div id="successPrompt" className="text-green-500 pt-10">
                            {error === '' && message}
                        </div>
                    </div>
                </div>
                {/* Button */}
                <div className="flex w-full">
                    <div className="w-40 mx-auto pt-5">
                        <Link to="/SAUpdateUA">
                            <Button color="bg-brown text-md" text="Save Changes" onClick={handleSubmit}/>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}