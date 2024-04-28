import React from "react";
import { useEffect, useState } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import Button from "../components/Button";
import {Table} from "flowbite-react";
import TableRow from "../components/TableRow";
import { HiPlusSm } from "react-icons/hi";
import UserSearchBar from "../components/UserSearchBar";
import SAHeader from '../components/SAHeader';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// Testing
const account1 = {
    id:1,
    fullName: "James Smith",
    username: "jamessmith123",
    email: "jamessmith@agent.com",
    type: "Real Estate Agent",
    status: "Active",
};

const account2 = {
    id:2,
    fullName: "John Doe",
    username: "johndoe123",
    email: "jdoe@seller.com",
    type: "Seller",
    status: "Active",
};

const account3 = {
    id:3,
    fullName: "Jane Doe",
    username: "janedoe123",
    email: "janedoe@agent.com",
    type: "Real Estate Agent",
    status: "Active",
};

const account4 = {
    id:4,
    fullName: "Dummy McDummy",
    username: "dummy123",
    email: "dmcdummy@buyer.com",
    type: "Buyer",
    status: "Suspended",
};

const accounts = [account1, account2, account3, account4];

function SARetrieveUAPage(props) {
    const headers = ['Full Name', 'Username', 'Email', 'Type', 'Status'];
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'SA User Account';
        axios.get('http://127.0.0.1:5000/retrieveAccountList', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const accountDict = response.data.accountDict;
        })
        .catch(error => {
            console.error('Error fetching user account list', error);
        });
    }, []);

    // Function to handle search
    const handleSearch = (query) => {
        // Search logic
        console.log("Searching for:", query);
    };

    // Function to handle row click
    const handleCellClick = (account) => {
        console.log("Cell clicked:", account);
        navigate(`/viewAccount/${account.id}`);
    }

    // Function to handle status color
    const statusColor = (status) => {
        if (status === "Active") {
            return "text-green-400";
        }
        else {
            return "text-red-400";
        }
    }

    return (
        <>
        {/* buyer header component */}
        <UserContextProvider><SAHeader /></UserContextProvider>   
        <div>
            {/* Rounded box */}
            <div className="rounded-xl bg-gray-100 shadow-xl m-20">
                <div className = "w-full flex">
                    {/* Top Heading */}
                    <div className="flex w-full p-10">
                        <div className="flex w-1/4 text-2xl font-bold">
                            User Account List ({accounts.length})
                        </div>
                        <div className="flex w-1/4 mx-auto">
                        </div>
                        <div className="flex w-1/4 mx-auto items-center">
                            <UserSearchBar placeholder="Search by username" onSubmit={handleSearch}/>
                        </div>
                        <Link to="/SACreateAcc">
                            <div className="flex w-60 pt-6 pb-6 mx-auto">
                                <Button color="bg-brown" text="Add User Account" icon={<HiPlusSm />}/>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            {headers.map((header, index) => (
                                <Table.HeadCell key={index} className="p-6 bg-gray-300">
                                    {header}
                                </Table.HeadCell>
                            ))}
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {/* Map through the accounts array */}
                            {accounts.map((account, index) => (
                                <TableRow 
                                    key={index} 
                                    account={account}
                                    onClick={handleCellClick}
                                    statusColor={statusColor(account.status)}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
        </>
    );
}

export default SARetrieveUAPage;

