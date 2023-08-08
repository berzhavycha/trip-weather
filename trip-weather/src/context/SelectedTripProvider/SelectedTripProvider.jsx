import React, { createContext, useContext, useEffect, useState } from 'react'

const tripContext = createContext()

const SelectedTripProvider = ({ children }) => {
    const [selectedTrip, setSelectedTrip] = useState('')

    return (
        <tripContext.Provider value={{ selectedTrip, setSelectedTrip }}>
            {children}
        </tripContext.Provider>
    )
}

export const useSelectedTripContext = () => {
    return useContext(tripContext)
}

export default SelectedTripProvider
