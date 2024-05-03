import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// components
import REAHeader from '../components/REAHeader'
import Button from '../components/Button'
import Footer from "../components/Footer";
import UploadFile from '../components/UploadFile'
import { TextInput, Textarea } from 'flowbite-react'

// hooks
import { UserContextProvider } from '../hooks/UseModalContext'

// assets
import Agent1 from '../assets/agent1.jpg'

function REAUpdateCredentialsUI(props) {
    const username = localStorage.getItem('username');

    // states for the form fields
    const [image, setImage] = useState(Agent1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [experience, setExperience] = useState('');
    const [license, setLicense] = useState('');
    const [language, setLanguage] = useState('');
    const [special, setSpecial] = useState('');
    const [about, setAbout] = useState('');
    const [awards, setAwards] = useState('');

    // error states
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    

    // Flag to check if the form is filled
    const [formFilled, setFormFilled] = useState(false);

    useEffect(() => {
        document.title = 'REA Update Profile Page';
        axios.get(`http://127.0.0.1:5000/updateREACredential/${username}`, {
            headers: {
            'Authorization': 'Bearer ' + props.token,
            'Content-Type': 'application/json'
        }})
            .then(response => {
                if (response) {
                    // setImage(Agent1)
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
                    setError('Account not found!');
                    setMessage('');
                }
            })
            .catch(error => {
                console.error('Error fetching REA credentials:', error);
            });
    }, []);

    function updateUserCredentials(event) {
        event.preventDefault();
        setFormFilled(true);

        console.log('Form Filled:', formFilled);

        // Check if all fields are filled
        if (!fullName | !email || !phoneNo || !experience || !license || !language || !special || !about || !awards) {
            setError('Please enter the required fields.');
            return;
        }

        // Check if the phone number and experience is in number format
        if (!/^\d+$/.test(phoneNo)) {
            setError('Please enter only numbers in the phone number field.');
            return;
        }
        if (!/^\d+$/.test(experience)) {
            setError('Please enter only numbers in the experience field.');
            return;
        }

        // If all checks pass, clear any previous errors and proceed with serverside account creation
        try {
            axios.post(`http://127.0.0.1:5000/updateREACredential/${username}`, {
                "fullName": fullName,
                "email": email,
                "phoneNo": phoneNo,
                "experience": experience,
                "license": license,
                "language": language,
                "special": special,
                "about": about,
                "award": awards,
            }, {
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
                console.log('REA Credentials updated successfully:', response.data);
                if (response.data) {
                    setError('');
                    setMessage('Credentials updated successfully!');
                }
                else {
                    setError('Credentials not updated!');
                    setMessage('');
                    console.log(error, 'Credentials not updated!');
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                setMessage('');
                setError("Credentials not updated!")
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
    
    function displayUserCredentialsUI(){
        return (
            <>
                {/* REA header component */}
                <UserContextProvider><REAHeader /></UserContextProvider>
                    <div className="flex flex-col">
                        <div className="flex w-full text-2xl font-bold p-10">
                            <h1>User Credentials</h1>
                        </div>
                        <div className="flex">
                            {/* Left side */}
                            <div className="w-1/2 pl-10">
                                {/* Upload Image  */}
                                <div className="mb-4 w-full">
                                    <p className="text-xl">Picture</p>
                                    <div className="flex w-2/3 items-center pt-3">
                                        <UploadFile image={image} setPicture={setImage} />
                                    </div>
                                </div>
                                {/* Specialties & Services */}
                                <div className="mb-8 w-2/3">
                                    <p className="text-xl">Specialties & Services</p>
                                    <Textarea
                                        type="text"
                                        value={special}
                                        onChange={(e) => setSpecial(e.target.value)}
                                        style={{resize: 'none', height: '150px'}}
                                    />
                                </div>
                                {/* About me */}
                                <div className="mb-8 w-2/3">
                                <p className="text-xl">About Me</p>
                                    <Textarea
                                        type="text"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
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
                                        value={phoneNo}
                                        required
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        {...(error && !phoneNo.trim() && { color: 'failure' })}
                                        {...(error && !phoneNo.trim() && { helperText: <>
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

                            </div>
                        </div>
                        {/* Error Message */}
                        <div>
                            {error && <div id="failedPrompt" className="text-red-500 text-center">{error}</div>}
                        </div>
                        {/* Succsful Message */}
                        <div id="successPrompt" className="text-green-500 text-center">
                                    {error === '' && message}
                        </div>
                        {/* Button */}
                        <div className="flex w-full pt-10">
                            <div className="w-40 mx-auto">
                                <Link to="/SAUpdateUA">
                                    <Button color="bg-blue-500 text-md" text="Save Changes" onClick={updateUserCredentials}/>
                                </Link>
                            </div>
                        </div>
                    </div>

                <div className='p-10'></div>
    
            <Footer />
            </>
        )
    }

    return (
        displayUserCredentialsUI()
    );
}

export default REAUpdateCredentialsUI;
