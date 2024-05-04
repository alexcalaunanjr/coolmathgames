import React from "react";
import { useEffect, useState } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import Button from "../components/Button";
import {Table} from "flowbite-react";
import CustomTable from "../components/Table";
import { HiPlusSm } from "react-icons/hi";
import SASearchUAUI from "../components/SASearchUAUI";
import SAHeader from '../components/SAHeader';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function SARetrieveUAListUI(props) {
    const headers = ['Full Name', 'Username', 'Email', 'Type', 'Status'];
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'SA User Account';
        axios.get('http://127.0.0.1:5000/SARetrieveUAList', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const accountDict = response.data.accountDict;
            const userData = accountDict.map(account => ({
                id: account.id,
                fullName: account.fullName,
                username: account.username,
                email: account.email,
                profile: account.profile,
                status: account.status.toUpperCase()
            }))
            setUsers(userData)
        })
        .catch(error => {
            console.error('Error fetching user account list', error);
        });
    }, []);

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/SASearchUA', {
            "query": searchQuery
        },{
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.data.userAccounts == "Not Found") {
                setUsers([])
            }
            else {
                const accountDict = response.data.userAccounts;
                setUsers(accountDict)
            }
        })
        .catch(error => {
            console.error('Error fetching user account list', error);
        });
    }, [searchQuery]);

    const handleCellClick = (row, col) => {
        // Get the username from the clicked row
        const username = rows[row][headers.indexOf('Username')];
        localStorage.setItem('clickedUser', username)
        navigate(`/SAViewUAUI`);
    }

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const rows = users.map(user => [user.fullName, user.username, user.email, user.profile, user.status]);

    // Function to handle status color
    const statusColor = (status) => {
        if (status.toLowerCase() === "active") {
            return "text-green-400";
        }
        else {
            return "text-red-400";
        }
    }

    function displayAccountList() {
        return(
            <>
        {/* buyer header component */}
        <UserContextProvider><SAHeader /></UserContextProvider>   
        <div>
            {/* Rounded box */}
            <div className="rounded-xl bg-gray-100 shadow-xl m-20">
                <div className = "w-full flex">
                    {/* Top Heading */}
                    <div className="flex w-full p-10">
                        <div className="mt-3 w-1/4 text-2xl font-bold">
                            User Account List ({rows.length})
                        </div>
                        <div className="w-1/4 mx-auto">
                        </div>
                        <div className="w-1/4 mx-auto">
                            <SASearchUAUI placeholder="Search by username" onSubmit={handleSearch}/>
                        </div>
                        <Link to="/SACreateUAUI">
                            <div className="lg:w-full  md:w-40 w-20 mx-auto">
                                <Button color="bg-blue-500" text="Add User Account" icon={<HiPlusSm />}/>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='p-5'></div>

                {/* Table */}
                <div className="overflow-x-auto px-10 pb-10">
                    <CustomTable 
                            headers={headers}
                            rows={rows}
                            statusColor={statusColor}
                            // Pass a function to handle cell click (ADDD THE LINK HERE)
                            onCellClick={handleCellClick}
                        />
                </div>
            </div>
        </div>
        </>
        )
    }

    return (
        displayAccountList()
    );
}

export default SARetrieveUAListUI;

