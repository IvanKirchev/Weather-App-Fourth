import React from 'react';
import renderer from 'react-test-renderer';
import Forecast from './Forecast';
import { IForecast } from '../../../api/WeatherApi';

const forecastMock: IForecast = {
    city:{
        id:727011,
        name:"Sofia",
        country:"BG",
        population:1152556,
        timezone:7200,
        sunrise:1637212932,
        sunset:1637212932
    },
    days: [
        {
            id:1637236800000,
            name:"Thursday",
            order:0,
            icon:"04d",
            forecastByHours:[],
            weatherDescription:"broken clouds",
            averageTemp:7.445,
            minTemp:0,
            maxTemp:0
        }
    ]
}

it("Should render Forecast component correctly", () => {
    const component = renderer.create(<Forecast forecast={forecastMock}/>)
    expect(component).toMatchSnapshot();
})