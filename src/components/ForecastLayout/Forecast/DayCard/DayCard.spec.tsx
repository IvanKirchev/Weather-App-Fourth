import React from "react";
import renderer from "react-test-renderer";
import DayCard from "./DayCard";
import enzyme from "enzyme";
import { IDayForecast } from "../../../../api/WeatherApi";

const mockDayForecast: IDayForecast = {
  id: 1637236800000,
  name: "Thursday",
  order: 0,
  icon: "04d",
  forecastByHours: [],
  weatherDescription: "broken clouds",
  averageTemp: 7.445,
  minTemp: 0,
  maxTemp: 0,
};

it("Should render DayCard component correctly", () => {
  const component = renderer.create(
    <DayCard
      day={mockDayForecast}
      selected={false}
      setSelectedDay={() => {}}
      setSelectedHour={() => {}}
      selectedHourIndex={0}
      setSelectedHourIndex={() => {}}
    />
  );
  expect(component).toMatchSnapshot();
});

it("Should call on a card click the following functions: setSelectedDat, setSelectedHour, setSelectedHourIndex", () => {
  const spySetSelectedDay = jest.fn();
  const spySetSelectedHour = jest.fn();
  const spySetSelectedHourIndex = jest.fn();

  const component = enzyme.shallow(
    <DayCard
      day={mockDayForecast}
      selected={false}
      setSelectedDay={spySetSelectedDay}
      setSelectedHour={spySetSelectedHour}
      selectedHourIndex={0}
      setSelectedHourIndex={spySetSelectedHourIndex}
    />
  );

  component.find(".day-card-box").at(0).simulate("click")

  expect(spySetSelectedDay).toHaveBeenCalled();
  expect(spySetSelectedHour).toHaveBeenCalled();
  expect(spySetSelectedHourIndex).toHaveBeenCalled();
});
