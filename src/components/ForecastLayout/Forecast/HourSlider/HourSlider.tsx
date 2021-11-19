import { Box, Slider } from "@mui/material";
import react, { Dispatch, SetStateAction } from "react";
import { IDayForecast, IHourForecast } from "../../../../api/WeatherApi";

interface HourSliderProps {
  day: IDayForecast | null;
  selectedHour: IHourForecast | null;
  setSelectedHour: Dispatch<SetStateAction<IHourForecast | null>>;
  selectedHourIndex: number;
  setSelectedHourIndex: Dispatch<SetStateAction<number>>;
}

function HourSlider(props: HourSliderProps) {
  function getHourByIndex(value: number) {
    if (props.day) {
      let date = new Date(props.day?.forecastByHours[value].dt * 1000);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } else {
      return "";
    }
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      if (props.day?.forecastByHours[newValue] != undefined) {
        let selected = props.day?.forecastByHours[newValue];
        props.setSelectedHour(selected);
        // When the slider is changed (value change or rerender) set the current value to the last avaible index if the new value is not available
        //console.log(newValue)
        props.setSelectedHourIndex(
          props.day.forecastByHours.length > newValue
            ? newValue
            : props.day.forecastByHours.length - 1
        );
      }
    }
  };

  const marks = props.day ? props.day.forecastByHours.map((hour, index) => {
    let newIndex = index || 0;

    return {
      value: index,
      label: getHourByIndex(newIndex),
    };
  }) : [];

  function getMaxSliderValue(): number {
    if(props.day && props.day.forecastByHours.length - 1 === 0) {
      return 1
    } else if(props.day) {
      return props.day.forecastByHours.length - 1
    } 

    return 0;
  }

  return (
    <>
      {props.day ? (
        <div>
          <Box sx={{ width: "41rem", marginLeft: "34%" }}>
            <Slider
              aria-label="Temperature"
              value={props.selectedHourIndex}
              valueLabelDisplay="off"
              step={1}
              marks={marks}
              min={0}
              max={getMaxSliderValue()}
              onChange={handleChange}
            />
          </Box>
        </div>
      ) : null}
    </>
  );
}

export default HourSlider;
