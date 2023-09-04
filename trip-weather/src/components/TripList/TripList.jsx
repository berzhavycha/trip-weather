import React, { useEffect, useState, useMemo } from 'react'
import { availableCities, changeDateForm } from '../../data'
import TripItem from '../TripItem/TripItem'
import ModalWindow from '../ModalWindow/ModalWindow'
import Slider from '../../common/Slider/Slider'
import './TripList.css'
import { useAddTripMutation, useGetTripsQuery } from '../../api/apiSlice'


const TripList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const { data: trips, isLoading } = useGetTripsQuery()
    const [addTrip] = useAddTripMutation()

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


    const addNewTrip = async (city, startDate, endDate) => {
        try {
            const newTrip = availableCities.find(trip => trip.city === city)
            newTrip.from = startDate
            newTrip.to = endDate
            
            await addTrip(newTrip), unwrap()
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)
        }

    }


    const handleAddItemClick = () => {
        setIsModalOpen(true)
    }


    const filteredTrips = useMemo(() => {
        if (!search) {
            return trips;
        }

        return trips.filter(trip => trip.city.toLowerCase().startsWith(search.toLowerCase()));
    }, [search, trips]);


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
                    {filteredTrips.map(trip => (
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
