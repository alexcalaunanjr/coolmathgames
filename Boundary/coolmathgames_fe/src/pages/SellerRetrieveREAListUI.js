import React, { useEffect, useState } from 'react';
import { UserContextProvider } from '../hooks/UseModalContext';
import { Link, useNavigate } from "react-router-dom";
import { Table } from 'flowbite-react';
import axios from 'axios';

import SellerHeader from '../components/SellerHeader';
import SellerSearchREAUI from '../components/SellerSearchREAUI';

function SellerRetrieveREAListUI(props) {
    const [REAList, setREAList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Seller Retrieve REA List';
        axios.get('http://127.0.0.1:5000/SellerRetrieveREAList', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            const READict = response.data.READict;
            const READata = READict.map(account => ({
                fullName: account.fullName,
                username: account.username
            }))
            setREAList(READata)
        })
        .catch(error => {
            console.error('Error fetching real estate agent list', error);
        });

    }, []);

    const header = ['Full Name', 'Username'];
    const rows = REAList.map(eachREA => [eachREA.fullName, eachREA.username]);

    const handleCellClick = (row, col) => {
        // go to clicked REA credentials
        const username = rows[row][header.indexOf('Username')];
        localStorage.setItem('clickedUser', username);
        console.log(username)
        navigate(`/SellerViewREACredentialsUI/${username}`);
    }

    // handle search bar
    const handleSearch = (query) => {
        setSearchQuery(query);
    };


    function displayREAList() {
        return (
            <>
            {/* seller header component */}
            <UserContextProvider><SellerHeader /></UserContextProvider>
            
            <div>
                <div className="rounded-xl bg-gray-100 shadow-xl m-20">
                    {/* Top Heading */}
                    <div className="flex w-full p-10">
                        <div className="mt-3 text-2xl font-bold">
                            Real Estate Agent List ({rows.length})
                        </div>
                        <div className="w-1/4 mx-auto">
                        </div>
                        {/* search bar */}
                        <div className="w-1/4 mx-auto">
                            <SellerSearchREAUI placeholder="Search real estate agent" onSubmit={handleSearch} setREA={setREAList} token={props.token} />
                        </div>
                    </div>

                    <div className='p-5'></div>

                    {/* Table */}
                    <div className="overflow-x-auto px-10 pb-10">
                        <Table hoverable>
                            <Table.Head>
                                {header.map((head, index) => (
                                    <Table.HeadCell key={index} className="bg-gray-300">{head}</Table.HeadCell>
                                ))}
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {rows.map((row, rowIndex) => (
                                    <Table.Row key={rowIndex} className="bg-white">
                                    {row.map((cell, cellIndex) => (
                                        <Table.Cell
                                            key={cellIndex}
                                            className={`whitespace-nowrap font-medium ${cellIndex === 0 ? 'text-gray-900' : ''}`}
                                            onClick={() => handleCellClick(rowIndex, cellIndex)}
                                        >
                                        {cell}
                                        </Table.Cell>
                                    ))}
                                    </Table.Row>
                                ))}
                                </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
            </>
        )
    }

    return(
        displayREAList()
    );
}

export default SellerRetrieveREAListUI;