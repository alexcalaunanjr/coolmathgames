import React, { useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { TextInput } from 'flowbite-react';
import axios from 'axios';

function BuyerCalculateMortgageUI({ openModal, onClose, price, token }) {
    const [error, setError] = useState('');

    const [loanAmount, setLoanAmount] = useState(price*0.5);
    const [interestRate, setInterestRate] = useState(2);
    const [loanTenure, setLoanTenure] = useState(10);

    const [submit, setSubmit] = useState(false);
    const [click, setClick] = useState(false);
    const [mortgage, setMortgage] = useState(0);

    useEffect(() => {
        if (click) {
            axios.post('http://127.0.0.1:5000/BuyerCalculateMortgage', {
                "loanAmount": parseInt(loanAmount),
                "interestRate": parseInt(interestRate),
                "loanTenure": parseInt(loanTenure)
            },{
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.data.mortgage) {
                    setMortgage(response.data.mortgage.toFixed(2));
                    setClick(false);
                }
                else {
                    console.log("Error calculating mortgage")
                }
            })
            .catch(error => {
                console.error('Error posting to backend', error);
            });
        }
    }, [click]);

    const handleErrorMessage = () => {
        if (!loanAmount || !interestRate || !loanTenure) {
            setError('Please fill in the required fields');
            return false;
        }
        else if (loanAmount > price*0.75 || interestRate < 1 || interestRate > 10 || loanTenure < 5 || loanTenure > 30) {
            setError('Please fill in the required fields correctly');
            return false;
        }
        else {
            setError('');
        }
        return true;
    }

    // Function to calculate the mortgage
    function handleSubmit() {
        if (handleErrorMessage())
        {
            error === '' && setSubmit(true);
            setClick(true)
        }
    }
    
    function displayBuyerCalculateMortgageUI() {
        
        return (
            <>
                <Modal show={openModal} size="3xl" onClose={onClose} popup>
                    <Modal.Header />
                    <Modal.Body>
                    <div className="space-y-6">
                        <div className="w-full flex text-2xl font-bold pl-3">
                            <h1>Estimated Mortgage</h1>
                        </div>
                        <div className="w-full flex pl-3">
                            {/* Left side */}
                            <div className="w-1/2">
                                {/* Property Price */}
                                <div className="mb-8 w-2/3">
                                    Property Price
                                    <TextInput
                                        type="text"
                                        addon="S$"
                                        value={price}
                                        readOnly
                                    />
                                </div>
                                {/* Loan Amount */}
                                <div className="mb-8 w-2/3">
                                    Loan Amount
                                    <TextInput
                                        type="text"
                                        addon="S$"
                                        value={loanAmount}
                                        onChange = {(e) => setLoanAmount(e.target.value)}
                                    />
                                    {
                                        (loanAmount > price*0.75) && 
                                            <span className="text-red-500 text-sm">Loan Amount cannot exceed 75% of Property Price</span>
                                    }
                                </div>
                                <div className="flex w-2/3 space-x-2">
                                    {/* Interest Rate */}
                                    <div className="mb-8 w-1/2">
                                        Interest Rate
                                        <TextInput
                                            type="text"
                                            addon="%"
                                            value={interestRate}
                                            onChange = {(e) => setInterestRate(e.target.value)}
                                        />
                                        {
                                            (interestRate < 1 || interestRate > 10) && 
                                            <span className="text-red-500 text-sm">Interest Rate must be between 1% and 10%</span>
                                        }
                                    </div>
                                    {/* Loan Tenure */}
                                    <div className="mb-8 w-1/2">
                                        Loan Tenure
                                        <TextInput
                                            type="text"
                                            addon="yrs"
                                            value={loanTenure}
                                            onChange = {(e) => setLoanTenure(e.target.value)}
                                        />
                                        {
                                            (loanTenure < 5 || loanTenure > 30) &&
                                            <span className="text-red-500 text-sm">Loan Tenure must be between 5 and 30 years</span>
                                        }
                                    </div>
                                </div>
                                {/* Error Message */}
                                <div className="w-2/3 text-red-500 text-sm mb-8 text-center">
                                    {error}
                                </div>
                                {/* Button to calculate */}
                                <div className="w-2/3 flex justify-center gap-4">
                                    <Button className='bg-blue-500'
                                            onClick={handleSubmit}>
                                        Calculate
                                    </Button>
                                </div>
                            </div>
                            {/* Right side */}
                            {
                                submit && (
                                    <div className="w-1/2 flex justify-center">
                                        {/* Mortgage Breakdown */}
                                        <div className="h-1/2 border-2 border-black rounded-md flex items-center">
                                            <div className="w-full">
                                                <div className="text-lg font-bold px-5">
                                                    Mortgage Breakdown
                                                </div>
                                                <div className='text-sm pt-2 px-5'>
                                                    <i className='text-gray-600'>Est. Monthly Repayment: </i> 
                                                    <p><b>S$ {mortgage} </b> / mo </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
    return (
        displayBuyerCalculateMortgageUI()
    )
}
export default BuyerCalculateMortgageUI;
