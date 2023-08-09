import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import TodayForecast from './components/TodayForecast/TodayForecast'
import TripForecast from './components/TripForecast/TripForecast'
import TripList from './components/TripList/TripList'
import { useSelectedTripContext } from './context/SelectedTripProvider/SelectedTripProvider'
import { useUserContext } from './context/UserProvider/UserProvider'
import './App.css'


function App() {

  const { selectedTrip } = useSelectedTripContext()
  const { setUser, isLoginOpen, setIsLoginOpen } = useUserContext()

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential)
    setUser(userObject)
    setIsLoginOpen(false)
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: '953343884932-k8cjfj3kf1ok1og4lp9pmvcquponsq78.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.querySelector('.sign-section'),
      { theme: 'outline', size: 'large' }
    )
  }, [])


  const handleSignSectionClick = e => {
    if (!e.target.classList.contains('sign-section')) {
      setIsLoginOpen(false)
    }
  }

  return (
    <>
      <main className='main-page'>
        <div className='trips-content'>
          <h1>Weather <strong>Forecast</strong></h1>
          <TripList />
          <TripForecast trip={selectedTrip} />
        </div>
        <TodayForecast />
      </main>
      <div className={`sign-section-shell ${isLoginOpen && 'open'}`} onClick={handleSignSectionClick}>
        <div className="sign-section"></div>
      </div>
    </>
  )
}

export default App
