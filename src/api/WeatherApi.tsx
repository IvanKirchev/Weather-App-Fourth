import Forecast from "../components/Forecast";

interface IForecast {
    city: ICity
    list: IHourForecast[]
    days: IDayForecast[]
}

interface IDayForecast {
    list: IHourForecast[]
    id: string
    name: string,
    averageTemp: number
    order: number
    forecastByHours: IHourForecast[]
    icon: string,
    minTemp: number,
    maxTemp: number,
    weatherDescription: string
}

interface IHourForecast {
    dt: number
    main: IMainForecastData
    weather: IWeatherDescription[]
    wind: IWind
    visibility: number
}

interface IMainForecastData {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        grnd_level: number
        humidity: number
        temp_kf: number
}

interface IWeatherDescription {
    id: number
    main: string
    description: string
    icon: string
}

interface IWind {
    speed: number
    deg: number
    gust: number
}

interface ICity {
    country: string
    id: number
    name: string
    population: number
    sunrise: number
    sunset: number
    timezone: number
}

export type { IForecast, IDayForecast, IHourForecast, IMainForecastData, IWeatherDescription, IWind };
