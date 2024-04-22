import React from "react";
import { Label, TextInput } from "flowbite-react";
import { UserContextProvider } from '../hooks/UseModalContext';
import Button from "../components/Button";
import CustomTable from "../components/Table";
import { HiPlusSm } from "react-icons/hi";
import UserSearchBar from "../components/UserSearchBar";
import SAHeader from '../components/SAHeader';
import { Link } from "react-router-dom";

// Testing
// const rows = [
//     ['John Doe', 'johndoe', 'jdoe@gmail.com', 'Admin', 'Active'],
//     ['John Doe', 'johndoe', 'jdoe@gmail.com', 'Admin', 'Active'],
//     ['John Doe', 'johndoe', 'jdoe@gmail.com', 'Admin', 'Active'],
//     ['John Doe', 'johndoe', 'jdoe@gmail.com', 'Admin', 'Suspended'],
//     ['John Doe', 'johndoe', 'jdoe@gmail.com', 'Admin', 'Active'],
// ];
const users = [ 
{
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "jdoe@gmail.com",
    type: "Admin",
    status: "Active"
}, 
{
    id: 2,
    name: "Julia Adams",
    username: "jadams",
    email: "jads@gmail.com",
    type: "Buyer",
    status: "Suspended"
}
];

function SARetrieveUAPage() {
    //   const [rows, setRows] = useState([]);

    // Fetch data from backend
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('http://localhost:5000/api/userprofiles');
//         const data = await response.json();
//         // Set fetched data to state
//         setRows(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     // Call fetchData() when component mounts
//     fetchData(); 
//     // / Empty dependency array ensures fetchData() is called only once
//   }, []); 

    // Table headers
    const headers = ['Full Name', 'Username', 'Email', 'Type', 'Status'];
    const rows = users.map(user => [user.name, user.username, user.email, user.type, user.status]);

    // Function to change status color
    const statusColor = (status) => {
        // If status is active, return green color
        if (status === 'Active') {
        return 'text-green-500';
        }
        // If status is suspended, return red color
        return 'text-red-500';
    }
    
    // Function to handle cell click
    const handleCellClick = (row, col) => {
        // Log the row and column index
        console.log(`Row: ${row}, Column: ${col}`);
        // Link to user profile page
        // ....
    }

    // Function to handle search
    const handleSearch = (query) => {
        // Search logic
        console.log("Searching for:", query);
    };

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
                            User Account List ({rows.length})
                        </div>
                        <div className="flex w-1/4 mx-auto">
                        </div>
                        <div className="flex w-1/4 mx-auto items-center">
                            <UserSearchBar placeholder="Search by username" onSubmit={handleSearch}/>
                        </div>
                        <Link to="/SACreateAcc">
                            <div className="flex w-60 pt-6 pb-6 mx-auto">
                                <Button color="bg-blue-500" text="Add User Account" icon={<HiPlusSm />}/>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* Table */}
                <div className="w-full flex p-10">
                    <CustomTable 
                        headers={headers}
                        rows={rows.map(row => row.map((cell, index) => index === headers.indexOf('Status') ? <span className={statusColor(cell)} key={index}>{cell}</span> : cell))}
                        // Pass a function to handle cell click
                        onCellClick={handleCellClick}
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default SARetrieveUAPage;

