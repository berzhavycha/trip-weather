import React, { useEffect, useState } from 'react'
import { useSelectedTripContext } from '../../context/SelectedTripProvider/SelectedTripProvider'
import { changeDateForm, daysArray } from '../../data'
import { useTodayForecastContext } from '../../context/TodayForecastProvider/TodayForecastProvider'
import { useUserContext } from '../../context/UserProvider/UserProvider'
import './TodayForecast.css'

const API_KEY = 'U5XJCBDPTSVUG54P7988GBW32'

const TodayForecast = () => {
    const { user } = useUserContext()
    const { selectedTrip } = useSelectedTripContext()
    const { isTodayForecastOpen, closeTodayForecast } = useTodayForecastContext()

    const [error, setError] = useState(null)
    const [weather, setWeather] = useState(null)

    const [timerDays, setTimerDays] = useState(0);
    const [timerHours, setTimerHours] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);

    const dayNumber = new Date().getDay()

    let interval;

    const startTimer = () => {
        const countDownDate = new Date(changeDateForm(selectedTrip?.from ?? '')).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            const days = Math.floor(distance / (24 * 60 * 60 * 1000));
            const hours = Math.floor(
                (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
            const seconds = Math.floor((distance % (60 * 1000)) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        });
    };

    useEffect(() => {
        startTimer();

        return () => clearInterval(interval)
    });


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchWeather = async (city) => {
            try {
                setError(null)
                const data = await (await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`, { signal })).json()
                setWeather(data)
            }
            catch (error) {
                setError(error)
            }
        }

        if (selectedTrip) {
            fetchWeather(selectedTrip.city.toLowerCase())
        }

        return () => controller.abort();
    }, [selectedTrip])


    return (
        <div className={`todays-forecast ${isTodayForecastOpen && 'open'}`}>
            {isTodayForecastOpen && <button onClick={closeTodayForecast}><i className="fa-solid fa-xmark"></i></button>}
            {user && (
                <div className="user-photo">
                    <img src={user.picture} />
                </div>
            )}
            {selectedTrip && weather ?
                <>
                    <div className={`today-forecase-inner ${selectedTrip && 'open'}`}>
                        <h1>{daysArray[dayNumber]}</h1>
                        <div className="weather-info">
                            <img src={`../../../dist/images/${weather.days[0].icon}.png`} />
                            <h1>{weather.days[0].temp} <p>°С</p></h1>
                        </div>
                        <p className='city'>{selectedTrip.city}</p>
                    </div>
                    <div className="time-left">
                        <div className="time-block">
                            <span>{timerDays}</span>
                            <p>days</p>
                        </div>
                        <div className="time-block">
                            <span>{timerHours}</span>
                            <p>hours</p>
                        </div>
                        <div className="time-block">
                            <span>{timerMinutes}</span>
                            <p>minutes</p>
                        </div>
                        <div className="time-block">
                            <span>{timerSeconds}</span>
                            <p>seconds</p>
                        </div>
                    </div>
                </>
                :
                error ?
                    <h1 className='error'>Error: {error.message}</h1>
                    :
                    <h1 className='select-trip-title'><i className="fa-solid fa-suitcase-rolling"></i> Select trip</h1>
            }
        </div>
    )
}

export default TodayForecast
