import React, { useState } from 'react';
import Button from './Button';
import PopUp from './PopUp';

function SAViewUPUI({ profile, profileDesc, onClick, token }) {
    const [popUp, setPopUp] = useState(false);
    // const [description, setDescription] = useState('');

    const handleClick = () => {
        localStorage.setItem('clickedProfile', profile.profile);
        onClick(profile.profile)
        setPopUp(true);
    }

    function displayUPDetails(){
        return (
            <div className={`p-5 flex w-full rounded-xl bg-gray-200 shadow-xl ${profile.status === 'suspended' ? 'text-red-500' : ''}`}>
                <div className="flex w-2/3 items-center">
                    <div style={{ color: profile.status === 'suspended' ? 'red' : 'inherit' }}>
                        {profile.profile}
                    </div>
                </div>
                    <div className="flex w-1/3 justify-center hover:cursor-pointer">
                        <Button color="bg-gray-500" text="View" onClick={handleClick} />
                    </div>
                {popUp && (
                    // Show the pop up
                    <PopUp
                        header="Description"
                        description={profileDesc}
                        openModal={popUp}
                        // Close the pop up
                        onClose={() => setPopUp(false)} 
                        token={token}
                    />
                )}
            </div>
        )
    }
    
    return(
        displayUPDetails()
    );
}

export default SAViewUPUI;
