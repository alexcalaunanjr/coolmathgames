import React, { useState } from 'react';
import Button from './Button';
import SAViewUPUI from './SAViewUPUI';

function UPCard({ profile, profileDesc, onClick, token }) {
    const [popUp, setPopUp] = useState(false);
    const [status, setStatus] = useState('');
    // const [description, setDescription] = useState('');

    const handleClick = () => {
        localStorage.setItem('clickedProfile', profile.profile);
        onClick(profile.profile)
        setPopUp(true);
    }

    function displayUPDetails(){
        return (
            <div className={`p-5 flex w-full rounded-xl bg-white shadow-xl ${profile.status === 'suspended' || status === 'suspended' ? 'text-red-500' : ''}`}>
                <div className="flex w-2/3 items-center">
                    <div style={{ color: profile.status === 'suspended' || status === 'suspended' ? 'red' : 'inherit' }}>
                        {profile.profile}
                    </div>
                </div>
                    <div className="flex w-1/3 justify-center hover:cursor-pointer">
                        <Button color="bg-gray-400 hover:bg-blue-500" text="View" onClick={handleClick} />
                    </div>
                {popUp && (
                    // Show the pop up
                    <SAViewUPUI
                        header="Description"
                        description={profileDesc}
                        openModal={popUp}
                        // Close the pop up
                        onClose={() => setPopUp(false)} 
                        token={token}
                        setStatus={setStatus}
                    />
                )}
            </div>
        )
    }
    
    return(
        displayUPDetails()
    );
}

export default UPCard;
