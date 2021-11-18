import axios from "axios";
import ApiConfig from "./ApiConfig";

interface IForecast {
    city: ICity
    days: IDayForecast[]
}

interface IDayForecast {
    id: number
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

function getForecastByCity(city: string, callback: (data: any | null, error: Error | null) => void) {
    const fetchData = async (): Promise<void> => {
        try {
            const response = await axios.get(`${ApiConfig.openweatherUrl}/data/2.5/forecast?q=${city}&appid=${ApiConfig.openWeatherAppID}&units=metric`)
            callback(response.data, null)
        } catch(error: any) {
            callback(null, error)
        }
    };

    fetchData();
}

export { getForecastByCity }
export type { IForecast, IDayForecast, IHourForecast, IMainForecastData, IWeatherDescription, IWind };
