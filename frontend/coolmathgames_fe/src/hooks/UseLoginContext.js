import React from "react";

const UserContext = React.createContext({
    isLoggedIn: false,
    userType: null,
    setUser: () => null,
});

export const UserContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userType, setUserType] = React.useState(null);

    return (
        <UserContext.Provider value={{ isLoggedIn, userType, setIsLoggedIn, setUserType }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return React.useContext(UserContext);
};

export default useUserContext;