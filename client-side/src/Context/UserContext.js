import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export function UserProvider({children}) {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData")) || null
    );
    
    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData])

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {children}
        </UserContext.Provider>
    )
}
