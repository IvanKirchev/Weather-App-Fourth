import React, { useState } from "react"
import {getForecastByCity, ICity, IDayForecast, IForecast, IHourForecast} from "../api/WeatherApi"

function useWeatherApi() {
    const [data, setData] = useState<IForecast | null>(null);
    const [error, setError] = useState<Error | null>(null);

    function parseForecastData(data: IForecast | null): IForecast {
        let days: IDayForecast[] = [];
        const city: ICity = data ? data.city as ICity : {} as ICity;

        if(data) {
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
                        icon: el.weather[0].icon,
                        forecastByHours: [el],
                        weatherDescription: el.weather[0].description,
                        averageTemp: 0,
                        minTemp: 0,
                        maxTemp: 0
                    }
                }
            });
        }

        days = days.map((day: IDayForecast)  => {
            return {...day, averageTemp: calculateDayAverageTemp(day.forecastByHours)}
        })

        days.sort((a: IDayForecast, b: IDayForecast) => a.id - b.id);

        const forecast: IForecast = {
            days,
            city,
            list: data?.list
        }

        return forecast;
    }

    function calculateDayAverageTemp(hourlyRecords: IHourForecast[]) {
        
        let temperaturesArray: number[] = [];

        hourlyRecords.forEach(element => {
            temperaturesArray.push(element.main.temp);
        });
        
        return temperaturesArray.reduce((a, b) => a + b, 0) / temperaturesArray.length;
    }

    const fetchData = (city: string) => {
        getForecastByCity(city, (data: IForecast | null, error: any) => {
            error ? setError(error) : setData(parseForecastData(data)); 
        })
    };

    return {data, fetchData, error, setError};
}

export default useWeatherApi;