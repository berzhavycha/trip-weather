import React, { useEffect, useState } from 'react'
import { changeDateForm, daysArray } from '../../data'
import Slider from '../../common/Slider/Slider'
import './TripForecast.css'

const API_KEY = 'U5XJCBDPTSVUG54P7988GBW32'

const TripForecast = ({ trip }) => {
    const [weatherForecast, setWeatherForecast] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchWeatherForecast = async (trip) => {
            setIsLoading(true)
            try {
                setError(null)
                const from = changeDateForm(trip.from)
                const to = changeDateForm(trip.to)

                const data = await (await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city.toLowerCase()}/${from}/${to}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`, { signal })).json()
                setWeatherForecast(data.days)
            } catch (err) {
                setError(err)
            }
            setIsLoading(false)
        }

        if (trip) {
            fetchWeatherForecast(trip)
        }

        return () => controller.abort();
    }, [trip])


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };


    let itemPerSlide = 6

    if (screenWidth < 1285 && weatherForecast?.length > 5) {
        itemPerSlide = 5
    } else if (screenWidth < 680 && weatherForecast?.length >= 4) {
        itemPerSlide = 4
    } else if (screenWidth < 580 && weatherForecast?.length >= 4) {
        itemPerSlide = 4
    } else if (screenWidth < 480 && weatherForecast?.length >= 3) {
        itemPerSlide = 3
    }


    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (error) {
        content = <h1 className='error'>Error: {error.message}</h1>
    } else if (trip && weatherForecast) {
        content = <>
            <h2>Week</h2>
            <div className="forecast-container">
                <Slider slides={weatherForecast} itemsPerSlide={itemPerSlide}>
                    {weatherForecast?.map((day, index) => {
                        const date = new Date(day.datetime)

                        return (
                            <div className="day-forecast" key={index}>
                                <p>{daysArray[date.getDay()]}</p>
                                <div className="weather-icon">
                                    <img src={`/images/${day.icon}.png`} />
                                </div>
                                <p className="temp">
                                    {Math.round(day.tempmax)}&#xb0;/{Math.round(day.tempmin)}&#xb0;
                                </p>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </>
    }

    return (
        <section className='trip-forecast'>
            {content}
        </section>
    )
}

export default TripForecast
