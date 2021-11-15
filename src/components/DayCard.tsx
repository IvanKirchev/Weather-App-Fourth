import { Grid, Card, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import react, { Dispatch, SetStateAction, useEffect } from "react"
import { IDayForecast, IHourForecast } from "../api/WeatherApi";

interface DayCardProps {
    selected: boolean
    setSelectedDay: Dispatch<SetStateAction<IDayForecast | null>>
    day: IDayForecast
    setSelectedHour: Dispatch<SetStateAction<IHourForecast | null>>
    selectedHourIndex: number
    setSelectedHourIndex: Dispatch<SetStateAction<number>>
}

function DayCard(props: DayCardProps) {


    // useEffect(() => {
    //    // let newSelectedIndex  = props.day.forecastByHours.length > props.selectedHourIndex ? props.selectedHourIndex : props.day.forecastByHours.length -1;
    //     //props.setSelectedHour(props.day.forecastByHours[props.selectedHourIndex])
    //     //props.setSelectedHourIndex(props.day.forecastByHours.length > props.selectedHourIndex ? props.selectedHourIndex : props.day.forecastByHours.length -1);
    // }, [props.day]);

    return (
        <Grid item xs>
            <Box onClick={() => {
                props.setSelectedDay(props.day)
                
                // let newSelectedIndex  = props.day.forecastByHours.length > props.selectedHourIndex ? props.selectedHourIndex : props.day.forecastByHours.length -1;
                // props.setSelectedHourIndex(props.day.forecastByHours.length > props.selectedHourIndex ? props.selectedHourIndex : props.day.forecastByHours.length -1);
            }
                }>
                <Card variant={props.selected ? "outlined" : "elevation"}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {props.day.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {Math.round(props.day.averageTemp * 10) / 10}°C
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" position="relative" right="25%">
                            <img src={`http://openweathermap.org/img/w/${props.day.icon}.png`} />
                        </Typography>
                        <Typography variant="h5">
                            {props.day.weatherDescription}
                        </Typography>
                    </CardContent>
                </Card> 
                </Box>
        </Grid>
    )
}

export default DayCard;