import React, { useState } from 'react';
import Button from './Button';
import PopUp from './PopUp';

function UPCard({ profile }) {
    const [popUp, setPopUp] = useState(false);
    const [description, setDescription] = useState('');

    const handleClick = () => {
        setDescription(profile.description);
        setPopUp(true);
    }

    return (
        <div className="p-5 flex w-full rounded-xl bg-gray-200 shadow-xl">
            <div className="flex w-2/3 items-center">
                {profile.name}
            </div>
            <div className="flex w-1/3 justify-center">
                <Button color="bg-gray-500" text="View" onClick={handleClick} />
            </div>
            {popUp && (
                // Show the pop up
                <PopUp
                    header="Description"
                    description={description}
                    openModal={popUp}
                    // Close the pop up
                    onClose={() => setPopUp(false)} 
                />
            )}
        </div>
    );
}

export default UPCard;
