import { renderHook, act } from "@testing-library/react-hooks";
import { IForecast } from "../api/WeatherApi";
import useWeatherApi from "./useWeatherApi";

describe("useWeatherApi", () => {
  test(`Default value of data and error should be null`, () => {
    const { result } = renderHook(() => useWeatherApi<IForecast>());

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test("Should fetchData and set it correctly", () => {
    const { result } = renderHook(() => useWeatherApi<IForecast>());

    act(() => {
      result.current.fetchData("Sofia");
    });

    expect(result.current.data).toBeDefined();
  });
});
