import React, { useEffect, useState, useMemo } from 'react'
import { useUserContext } from '../../context/UserProvider/UserProvider'
import { availableCities, changeDateForm } from '../../data'
import TripItem from '../TripItem/TripItem'
import ModalWindow from '../ModalWindow/ModalWindow'
import Slider from '../../common/Slider/Slider'
import './TripList.css'


const TripList = () => {
    const { user, setIsLoginOpen } = useUserContext()

    const [trips, setTrips] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        setTrips(JSON.parse(localStorage.getItem('trips')))
        setIsLoading(false)
    }, [isModalOpen])


    useEffect(() => {
        if (!search) {
            setTrips(JSON.parse(localStorage.getItem('trips')))
        } else {
            setTrips(JSON.parse(localStorage.getItem('trips'))
                ?.filter(trip => trip.city.toLowerCase().startsWith(search.toLowerCase())))
        }
    }, [search])


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };


    let itemPerSlide = 3;

    if (screenWidth < 760 && trips?.length >= 3) {
        itemPerSlide = 2;
    } else if (screenWidth < 580 && trips?.length >= 2) {
        itemPerSlide = 1;
    }


    const addNewTrip = (city, startDate, endDate) => {
        const newTrip = availableCities.find(trip => trip.city === city)
        newTrip.from = startDate
        newTrip.to = endDate

        const existingTrips = JSON.parse(localStorage.getItem('trips')) || []
        const updatedTrips = [...existingTrips, newTrip]
        localStorage.setItem('trips', JSON.stringify(updatedTrips))
        setTrips(updatedTrips)
        setIsModalOpen(false)
    }


    const handleAddItemClick = () => {
        if (!user) {
            setIsLoginOpen(true)
        } else {
            setIsModalOpen(true)
        }
    }


    const sortedTrips = useMemo(
        () => trips
            ?.map(trip => ({
                ...trip,
                startDate: new Date(changeDateForm(trip.from)),
            }))
            ?.sort((a, b) => a.startDate - b.startDate),
        [trips]
    )


    if (isLoading) return <h1>Loading...</h1>

    return (
        <section className='trip-list-section'>
            <div className="trip-search">
                <input
                    type="text"
                    placeholder='Search your trip'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <div className="trip-container">
                <Slider slides={trips} itemsPerSlide={itemPerSlide}>
                    {sortedTrips.map(trip => (
                        <TripItem trip={trip} key={trip.id} />
                    ))}
                </Slider>
                <div onClick={handleAddItemClick} className="add-trip-item">
                    <i className="fa-solid fa-plus"></i>
                    <h2>Add trip</h2>
                </div>
            </div>
            <ModalWindow
                isOpen={isModalOpen}
                closeWindow={() => setIsModalOpen(false)}
                addNewTrip={addNewTrip}
            />
        </section>
    )
}

export default TripList
