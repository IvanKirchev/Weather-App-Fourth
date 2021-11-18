import React, { useState } from "react"
import {getForecastByCity, IDayForecast, IHourForecast} from "../api/WeatherApi"

function useWeatherApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    function parseForecastData(data: any) {
        let days: IDayForecast[] = [];
        let order = 0;

        data.list.forEach((el: IHourForecast) => {
            let date = new Date(el.dt * 1000);
            let index = date.getDay();
            if(days[index]) {
                let day = days[index]; 
                days[index] = {
                    ...day, 
                    forecastByHours: [...day.forecastByHours, el]
                }
            } else {
                days[index] = {
                    id: date.getTime(),
                    name: date.toLocaleString('en-us', {  weekday: 'long' }),
                    order: order++,
                    icon: el.weather[0].icon,
                    forecastByHours: [el],
                    weatherDescription: el.weather[0].description,
                    averageTemp: 0,
                    minTemp: 0,
                    maxTemp: 0
                }
            }
        });

        days.forEach((e: IDayForecast)  => {
            e.averageTemp = calculateDayAverageTemp(e.forecastByHours);
        });

        days.sort((a: any, b: any) => a.order - b.order);
        return {...data, days};
    }

    function calculateDayAverageTemp(hourlyRecords: IHourForecast[]) {
        let temperaturesArray: number[] = [];

        hourlyRecords.forEach(element => {
            temperaturesArray.push(element.main.temp);
        });
        
        return temperaturesArray.reduce((a, b) => a + b, 0) / temperaturesArray.length;
    }

    const getData = (city: string) => {
        getForecastByCity(city, (data: any, error: any) => {
            error ? setError(error) : setData(parseForecastData(data)); 
        })
    };

    return {data, getData, error, setError};
}

export default useWeatherApi;