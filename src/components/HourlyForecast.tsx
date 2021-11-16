import { Box, Slider } from "@mui/material";
import react, { Dispatch, SetStateAction, useEffect } from "react"
import { IDayForecast, IHourForecast } from "../api/WeatherApi";
import DayCard from "./DayCard";

interface IHourlyForecastProps {
    day: IDayForecast | null
    selectedHour: IHourForecast | null
    setSelectedHour: Dispatch<SetStateAction<IHourForecast | null>>
    selectedHourIndex: number,
    setSelectedHourIndex: Dispatch<SetStateAction<number>>
}

function HourlyForecast(props: IHourlyForecastProps) {

    function getHourByIndex(value: number) {
        if(props.day) {
            let date = new Date(props.day?.forecastByHours[value].dt * 1000)
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: "short" });
        } else {
            return ""
        }
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            if(props.day?.forecastByHours[newValue] != undefined) {
                let selected = props.day?.forecastByHours[newValue];
                props.setSelectedHour(selected);
                // When the slider is changed (value change or rerender) set the current value to the last avaible index if the new value is not available
                //console.log(newValue)
                props.setSelectedHourIndex(props.day.forecastByHours.length > newValue ? newValue : props.day.forecastByHours.length -1);
            }
        }
      };

      function getSelectedHourIndex(): number {
          if(props.selectedHour) {
            let index = props.day?.forecastByHours.indexOf(props.selectedHour);
            return index ? index : 0;
          }
          return 0
      }

    return (
        <>
        {props.day ? (
            <div>
                <Box sx={{ width: "41rem", marginLeft: "34%"}}>
                    <Slider
                        aria-label="Temperature"
                        value={props.selectedHourIndex}
                        
                        valueLabelDisplay="off"
                        step={1}
                        marks={props.day.forecastByHours.map(h => {
                            let index = props.day?.forecastByHours.indexOf(h);
                            index = index ? index : 0;
                            return {
                                value: index,
                                label: getHourByIndex(index)
                            }
                        })}
                        min={0}
                        max={props.day.forecastByHours.length - 1 === 0 ? 1 : props.day.forecastByHours.length - 1}
                        onChange={handleChange}
                    />
                </Box>
            </div>
        ) : null }
        
        </>
    );
}

export default HourlyForecast;