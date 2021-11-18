import React from "react";
import renderer from "react-test-renderer";
import HourSlider from "./HourSlider";
import enzyme from "enzyme";
import { IDayForecast, IHourForecast } from "../../../../api/WeatherApi";

const mockHour = {
  dt: 16372368,
  main: {
    temp: 13,
    feels_like: 13,
    temp_min: 13,
    temp_max: 13,
    pressure: 13,
    sea_level: 13,
    grnd_level: 13,
    humidity: 13,
    temp_kf: 13,
  },
  weather: [
    {
      id: 13,
      main: "13",
      description: "Nice weather",
      icon: "icon url",
    },
  ],
  wind: {
    speed: 13,
    deg: 13,
    gust: 14,
  },
  visibility: 1000,
};

const mockDayForecast: IDayForecast = {
  id: 1637236800000,
  name: "Thursday",
  order: 0,
  icon: "04d",
  forecastByHours: [mockHour],
  weatherDescription: "broken clouds",
  averageTemp: 7.445,
  minTemp: 0,
  maxTemp: 0,
};

it("Should render HourSlider component correctly", () => {
  const component = renderer.create(
    <HourSlider day={mockDayForecast} selectedHour={mockHour} setSelectedHour={() => {}} setSelectedHourIndex={() => {}} selectedHourIndex={0}/>
  );

  expect(component).toMatchSnapshot()
});
