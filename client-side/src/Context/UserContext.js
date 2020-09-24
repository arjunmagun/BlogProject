import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export function UserProvider({children}) {
    const [userData, setUserData] = useState(
        localStorage.getItem("userData") || null
    );
    
    useEffect(() => {
        localStorage.setItem("userData", userData);
    }, [userData])

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {children}
        </UserContext.Provider>
    )
}
