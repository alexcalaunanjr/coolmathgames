import React, { useState } from 'react';

function CustomDropdown({ options, label, onSelect }) {
    const [selectedItem, setSelectedItem] = useState('');

    const handleSelectChange = (event) => {
        const selectedItemValue = event.target.value;
        setSelectedItem(selectedItemValue);
        onSelect(selectedItemValue);
    };

    return (
        <div className="w-full">
            <select
                className="block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
                onChange={handleSelectChange}
                value={selectedItem}
            >
                <option value="" disabled hidden> {label} </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CustomDropdown;
