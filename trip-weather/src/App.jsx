import TodayForecast from './components/TodayForecast/TodayForecast'
import TripForecast from './components/TripForecast/TripForecast'
import TripList from './components/TripList/TripList'
import { useSelectedTripContext } from './context/SelectedTripProvider/SelectedTripProvider'
import './App.css'


function App() {

  const { selectedTrip } = useSelectedTripContext()

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
    </>
  )
}

export default App
