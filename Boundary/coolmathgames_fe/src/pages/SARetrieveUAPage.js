import React from "react";
import { useEffect, useState } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import Button from "../components/Button";
import {Table} from "flowbite-react";
import CustomTable from "../components/Table";
import { HiPlusSm } from "react-icons/hi";
import UserSearchBar from "../components/UserSearchBar";
import SAHeader from '../components/SAHeader';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function SARetrieveUAPage(props) {
    const headers = ['Full Name', 'Username', 'Email', 'Type', 'Status'];
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
            displayAccountList(accountDict)
        })
        .catch(error => {
            console.error('Error fetching user account list', error);
        });
    }, []);

    function displayAccountList(accountDict) {
        const userData = accountDict.map(account => ({
            id: account.id,
            name: account.fullName,
            username: account.username,
            email: account.email,
            type: account.profile,
            status: account.status.toUpperCase()
        }))
        setUsers(userData)
    }
    console.log(users)

    const rows = users.map(user => [user.name, user.username, user.email, user.type, user.status]);

    const handleCellClick = (row, col) => {
        // Get the username from the clicked row
        const username = rows[row][headers.indexOf('Username')];
        localStorage.setItem('clickedUser', username)
        navigate(`/SAViewAccount`);
    }

    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredRows = rows.filter(row => {
        return row[1].toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Function to handle status color
    const statusColor = (status) => {
        if (status.toLowerCase() === "active") {
            return "text-green-400";
        }
        else {
            return "text-red-400";
        }
    }
    // Map through the filtered rows
    // const tableRows = filteredRows.map((row, index) => (
    //     <TableRow 
    //         key={index} 
    //         row={row}  // Pass the filtered row data to TableRow component
    //         onClick={handleCellClick}
    //         statusColor={statusColor(row.status)}
    //     />
    // ));

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
                        <div className="mt-3 w-1/4 text-2xl font-bold">
                            User Account List ({rows.length})
                        </div>
                        <div className="w-1/4 mx-auto">
                        </div>
                        <div className="w-1/4 mx-auto">
                            <UserSearchBar placeholder="Search by username" onSubmit={handleSearch}/>
                        </div>
                        <Link to="/SACreateAcc">
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
                            rows={filteredRows}
                            statusColor={statusColor}
                            // Pass a function to handle cell click (ADDD THE LINK HERE)
                            onCellClick={handleCellClick}
                        />
                </div>
            </div>
        </div>
        </>
    );
}

export default SARetrieveUAPage;

