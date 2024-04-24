import React, {useState, useEffect} from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import LogOutModal from './LogOutModal';
import pfp from '../assets/pfp.jpg';
import axios from 'axios';

// try modal import
import useModalContext from '../hooks/UseModalContext';

function SellerHeader() {
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
        <LogOutModal />

        {/* header */}
        <Navbar fluid rounded>
            {/* brand logo */}
            <Navbar.Brand href="#">
                <span className="self-center text-3xl font-Limelight dark:text-white pl-2">MICASA</span>
            </Navbar.Brand>

            {/* heart & profile avatar */}
            <div className="flex md:order-2">
                {/* heart */}
                <Navbar.Brand href="#" className="mr-4">
                    <svg class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                    </svg>
                </Navbar.Brand>
                
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

                    {/* Log Out dropdown */}
                    <Dropdown.Item onClick={() => setOpenModal(true)}>Log Out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>

            {/* words on top */}
            <Navbar.Collapse>
                <Navbar.Link href="/SellerHomePage" className='text-gray-900 hover:text-yellow-700'>My Properties</Navbar.Link>
                <Navbar.Link href="#" className='text-gray-900 hover:text-yellow-700'>Find Real Estate Agent</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}
export default SellerHeader;