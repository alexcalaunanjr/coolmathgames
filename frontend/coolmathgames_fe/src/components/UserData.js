import React from "react";

function UserData({ user }) {
    return (
        <div className="flex" >
            <div>
                {user.fullName}
            </div>
        </div>
    );
};

export default UserData;