import { Box, Grid, Card, CardContent, Typography } from "@mui/material"

import react, { Dispatch, SetStateAction } from "react"
import { IDayForecast, IHourForecast } from "../../../../api/WeatherApi";

interface DayCardProps {
    selected: boolean
    setSelectedDay: Dispatch<SetStateAction<IDayForecast | null>>
    day: IDayForecast
    setSelectedHour: Dispatch<SetStateAction<IHourForecast | null>>
    selectedHourIndex: number
    setSelectedHourIndex: Dispatch<SetStateAction<number>>
}

function DayCard(props: DayCardProps) {

    return (
        <Grid item xs>
            <Box className="day-card-box" onClick={() => {
                const targetDay = props.day
                const newSelectedHourIndex = targetDay.forecastByHours.length > props.selectedHourIndex ? props.selectedHourIndex : targetDay.forecastByHours.length -1;
                const newSelectedHour = targetDay.forecastByHours[newSelectedHourIndex]

                props.setSelectedDay(targetDay)
                props.setSelectedHourIndex(newSelectedHourIndex)
                props.setSelectedHour(newSelectedHour);
            }
                }>
                <Card sx={{ cursor: 'pointer' }} variant={props.selected ? "outlined" : "elevation"}>
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