import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TodayForecastProvider from './context/TodayForecastProvider/TodayForecastProvider.jsx'
import UserProvider from './context/UserProvider/UserProvider.jsx'
import SelectedTripProvider from './context/SelectedTripProvider/SelectedTripProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <SelectedTripProvider>
        <TodayForecastProvider>
          <App />
        </TodayForecastProvider>
      </SelectedTripProvider>
    </UserProvider>
  </React.StrictMode>,
)
