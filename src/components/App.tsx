import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import {useState} from "react"
import WeatherLayout from './WeatherLayout';
import useWeatherApi from '../hooks/useWeatherApi';
import { IForecast } from '../api/WeatherApi';

function App() {

  const [city, setCity] = useState("");
  const {data, getData, error} = useWeatherApi<IForecast>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, [])

  const changeCity = (newCity: string) => {
    setCity(newCity);
  }
  
  return (
    <div className="App">
      <Header changeCity={changeCity} city={city} getForecast={getData}/>
      <WeatherLayout forecast={data} city={city}/>
    </div>
  );
}

export default App;
