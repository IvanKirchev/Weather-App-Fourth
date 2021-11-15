import react, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { IDayForecast, IForecast, IHourForecast } from "../api/WeatherApi";
import DayCard from "./DayCard";    
import HourlyForecast from "./HourlyForecast";
import HourlyFullForecast from "./HourlyFullForecast";

interface ForecastProps {
    forecast: IForecast | null
}

function Forecast(props:ForecastProps) {
    const [selectedDay, setSelectedDay] = useState<IDayForecast | null>(null);
    const [selectedHour, setSelectedHour] = useState<IHourForecast | null>(null);
    const [selectedHourIndex, setSelectedHourIndex] = useState<number>(0);

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
    );

    const StyledDayCard = styled(DayCard)(() => ({
        ":hover": "pointer"
    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            {props.forecast ? <h2>5 Days forcast for {props.forecast?.city.name}</h2> : null }
            <Grid container spacing={2}>
                {props.forecast?.days.map((d) => {
                    return (
                        <StyledDayCard key={d.id} selected={selectedDay?.id == d.id } day={d} setSelectedDay={setSelectedDay} setSelectedHour={setSelectedHour} selectedHourIndex={selectedHourIndex} setSelectedHourIndex={setSelectedHourIndex}/>
                )
                })}
            </Grid>
            { selectedDay ? (
                <>
                    <Grid container spacing={2} marginTop="1%">
                        <Grid item xs>
                            <HourlyFullForecast hourForecast={selectedHour} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop="1%">
                        <Grid item xs>
                            <HourlyForecast selectedHour={selectedHour} setSelectedHour={setSelectedHour}  day={selectedDay} selectedHourIndex={selectedHourIndex} setSelectedHourIndex={setSelectedHourIndex} />
                        </Grid>
                    </Grid>
                </>
            ) : null }
        </Box>
    );
}

export default Forecast;