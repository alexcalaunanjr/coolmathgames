import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import LogOutModal from './LogOutModal';
import pfp from '../assets/pfp.jpg';

// try modal import
import useModalContext from '../hooks/UseModalContext';

function SAHeader() {
    const { openModal, setOpenModal } = useModalContext();

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

            {/* profile avatar */}
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false} 
                    inline
                    label={<Avatar alt="User settings" img={pfp} rounded className='pr-2'/>}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">pookiekevy123</span>
                        <span className="block truncate text-sm font-medium">tiffisthebest@gmail.com</span>
                    </Dropdown.Header>

                    {/* Log Out dropdown */}
                    <Dropdown.Item onClick={() => setOpenModal(true)}>Log Out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>

            {/* words on top */}
            <Navbar.Collapse>
                <Navbar.Link href="#" className='text-gray-900 hover:text-yellow-700'>User Account</Navbar.Link>
                <Navbar.Link href="#" className='text-gray-900 hover:text-yellow-700'>User Profile</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}
export default SAHeader;