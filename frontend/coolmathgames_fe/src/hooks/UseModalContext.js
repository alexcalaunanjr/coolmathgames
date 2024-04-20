import React from "react";

const UserContext = React.createContext({
    openModal: false,
    setOpenModal: () => null,
    // add other user data
});

export const UserContextProvider = ({children}) => {
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <UserContext.Provider value={{ openModal, setOpenModal }}>
            {children}
        </UserContext.Provider>
    )
}

const useModalContext = () => {
    return React.useContext(UserContext)
};

export default useModalContext;