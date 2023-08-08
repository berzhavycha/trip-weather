import React from 'react'
import { useSelectedTripContext } from '../../context/SelectedTripProvider/SelectedTripProvider'
import { useTodayForecastContext } from '../../context/TodayForecastProvider/TodayForecastProvider'
import { useUserContext } from '../../context/UserProvider/UserProvider'
import './TripItem.css'

const TripItem = ({ trip }) => {
    const { setSelectedTrip } = useSelectedTripContext()
    const { openTodayForecast } = useTodayForecastContext()
    const { user, setIsLoginOpen } = useUserContext()

    const handleTripItemClick = () => {
        if (!user) {
            setIsLoginOpen(true)
        } else {
            setSelectedTrip(trip)
        }
    }

    const handleSelectTrip = () => {
        if (!user) {
            setIsLoginOpen(true)
        } else {
            openTodayForecast()
        }
    }

    return (
        <div className='trip-item' onClick={handleTripItemClick}>
            <div className="trip-image">
                <img src={trip.imageUrl} />
            </div>
            <div className="trip-info">
                <p className='city-name'>{trip.city}</p>
                <p className='time'>{trip.from} - {trip.to}</p>
                <button onClick={handleSelectTrip}>Select trip</button>
            </div>
        </div>
    )
}

export default TripItem
