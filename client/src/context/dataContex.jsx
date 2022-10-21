import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataContexProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const login = (user) => {
        setCurrentUser(user);
        window.localStorage.setItem("userLogged", JSON.stringify(user));
    };

    const logout = () => {
        window.localStorage.clear();
        setCurrentUser(null);
    };

    useEffect(() => {
        if (!currentUser)
            setCurrentUser(
                JSON.parse(window.localStorage.getItem("userLogged"))
            );
    }, []);

    return (
        <DataContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
