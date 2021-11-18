import React from "react";
import renderer from "react-test-renderer";
import HourlyForecast from "./HourlyForecast";
import enzyme from "enzyme";
import { IHourForecast } from "../../../../api/WeatherApi";


const mockHourForecast: IHourForecast = {
    dt:16372368,
    main: {
        temp: 13,
        feels_like: 13,
        temp_min: 13,
        temp_max: 13,
        pressure: 13,
        sea_level: 13,
        grnd_level: 13,
        humidity: 13,
        temp_kf: 13
    },
    weather: [
        {
            id: 13,
            main: "13",
            description: "Nice weather",
            icon: "icon url",
        }
    ],
    wind: {
        speed: 13,
        deg: 13,
        gust: 14
    },
    visibility: 1000
}

it("Should render HourlyForecast component correctly", () => {
    const component = renderer.create(<HourlyForecast hourForecast={mockHourForecast}/>)
    expect(component).toMatchSnapshot();
})