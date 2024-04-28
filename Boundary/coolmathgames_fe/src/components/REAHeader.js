import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import LogoutUI from './LogOutModal';
import pfp from '../assets/pfp.jpg';
import axios from 'axios';

// try modal import
import useModalContext from '../hooks/UseModalContext';

function REAHeader() {
    const { openModal, setOpenModal } = useModalContext();
    const [email, setEmail] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        // Get the username and email from local storage
        axios.get(`http://127.0.0.1:5000/userCredentials/${username}`)
          .then(response => {
              const email = response.data.email;
              setEmail(email)
          })
          .catch(error => {
              console.error("Error fetching email:", error);
          });
      }, []);

    return (
        <>
        {/* Log Out popup confirmation */}
        <LogoutUI />

        {/* header */}
        <Navbar fluid rounded>
            {/* brand logo */}
            <Navbar.Brand href="#">
                <span className="self-center text-3xl font-Limelight dark:text-white pl-2">MICASA</span>
            </Navbar.Brand>

            {/* profile avatar */}
            <div className="flex md:order-2">
                {/* profile + dropdown */}
                <Dropdown
                    arrowIcon={false} 
                    inline
                    label={<Avatar alt="User settings" img={pfp} rounded className='pr-2'/>}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{username}</span>
                        <span className="block truncate text-sm font-medium">{email}</span>
                    </Dropdown.Header>
                    <Dropdown.Item href="/REAViewCredentialsPage" className='text-gray-900 hover:text-yellow-700'>View My Credentials</Dropdown.Item>
                    <Dropdown.Divider />    
                    {/* Log Out dropdown */}
                    <Dropdown.Item className='text-gray-900 hover:text-red-500' onClick={() => setOpenModal(true)}>Log Out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>

            {/* words on top */}
            <Navbar.Collapse>
                <Navbar.Link href="/REAHomePage" className='text-gray-900 hover:text-yellow-700'>My Properties</Navbar.Link>
                <Navbar.Link href="#" className='text-gray-900 hover:text-yellow-700'>Create Property</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}
export default REAHeader;