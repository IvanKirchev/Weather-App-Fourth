import { Box, Card, CardContent } from "@mui/material";
import react from "react"
import { IHourForecast } from "../api/WeatherApi";

interface IHourlyFullForecast {
    hourForecast: IHourForecast | null
}

function HourlyFullForecast(props: IHourlyFullForecast) {
    return (
        
            <div>
                <Box sx={{ width: "55rem", marginLeft: "27%"}}>
                    <Card variant="outlined">
                        <CardContent>
                            <div>Pressure is {props.hourForecast?.main.pressure}</div>
                            <div>Minimum temperature {props.hourForecast?.main.temp_min}</div>
                            <div>Maximum temperature {props.hourForecast?.main.temp_max}</div>
                        </CardContent>
                    </Card> 
                </Box>
            </div>
    )
}

export default HourlyFullForecast;