import React, { useState } from "react"
import { IDayForecast, IForecast } from "../api/WeatherApi";
import Forecast from "./Forecast"

interface WeatherLayoutProps {
    forecast: IForecast | null,
    city: string
}

function WeatherLayout(props:WeatherLayoutProps) {
    return (
        
        <div>
            <Forecast forecast={props.forecast}/>
        </div>
    );
}

export default WeatherLayout