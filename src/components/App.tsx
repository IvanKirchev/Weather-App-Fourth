import React, { useEffect } from 'react';
import './App.css';
import Header from './Header/Header'
import {useState} from "react"
import ForecastLayout from './ForecastLayout/ForecastLayout';
import useWeatherApi from '../hooks/useWeatherApi';
import { IForecast } from '../api/WeatherApi';
import ErrorBoundary from './ErrorBoundary';

function App() {

  const [city, setCity] = useState("");
  const [errorBoundaryKey, setErrorBoundarykey] = useState(0);
  const {data, fetchData, error, setError} = useWeatherApi();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, [])

  return (
    <div className="App">
        <Header changeCity={setCity} city={city} getForecast={fetchData} setError={setError} setErrorBoundaryKey={setErrorBoundarykey}/>
        <ErrorBoundary key={errorBoundaryKey}>
          <ForecastLayout forecast={data} error={error}/>
        </ErrorBoundary>
    </div>
  );
}

export default App;
