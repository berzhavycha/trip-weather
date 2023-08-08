import React, { createContext, useContext, useState } from 'react'

const userContext = createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    return (
        <userContext.Provider
            value={{
                user,
                setUser,
                isLoginOpen,
                setIsLoginOpen
            }}
        >
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userContext)
}

export default UserProvider
