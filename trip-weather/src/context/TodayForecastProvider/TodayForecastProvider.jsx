import React, { createContext, useContext, useState } from 'react'

const forecastContext = createContext()

const TodayForecastProvider = ({ children }) => {
    const [isTodayForecastOpen, setIsTodayForecastOpen] = useState(false)

    const openTodayForecast = () => {
        setIsTodayForecastOpen(true)
    }

    const closeTodayForecast = () => {
        setIsTodayForecastOpen(false)
    }

    return (
        <forecastContext.Provider
            value={{
                isTodayForecastOpen,
                openTodayForecast,
                closeTodayForecast
            }}
        >
            {children}
        </forecastContext.Provider>
    )
}

export const useTodayForecastContext = () => {
    return useContext(forecastContext)
}

export default TodayForecastProvider
