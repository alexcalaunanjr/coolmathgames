import React, {useState, useEffect} from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import LogoutUI from './LogOutUI';
import pfp from '../assets/pfp.png';
import axios from 'axios';

// try modal import
import useModalContext from '../hooks/UseModalContext';

function SellerHeader() {
    const { openModal, setOpenModal } = useModalContext();
    const username = localStorage.getItem('username');


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
                <Dropdown
                    arrowIcon={false} 
                    inline
                    label={<Avatar alt="User settings" img={pfp} rounded className='pr-2'/>}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{username}</span>
                    </Dropdown.Header>

                    {/* Log Out dropdown */}
                    <Dropdown.Item className='text-gray-900 hover:text-red-500' onClick={() => setOpenModal(true)}>Log Out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>

            {/* words on top */}
            <Navbar.Collapse>
                <Navbar.Link href="/SellerRetrieveListingListUI" className='text-gray-900 hover:text-yellow-700'>My Properties</Navbar.Link>
                <Navbar.Link href="#" className='text-gray-900 hover:text-yellow-700'>Find Real Estate Agent</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}
export default SellerHeader;