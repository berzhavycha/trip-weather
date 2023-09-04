import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TodayForecastProvider from './context/TodayForecastProvider/TodayForecastProvider.jsx'
import SelectedTripProvider from './context/SelectedTripProvider/SelectedTripProvider'
import { apiSlice } from './api/apiSlice.js'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <SelectedTripProvider>
        <TodayForecastProvider>
          <App />
        </TodayForecastProvider>
      </SelectedTripProvider>
    </ApiProvider>
  </React.StrictMode>,
)
