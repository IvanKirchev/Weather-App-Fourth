import React, { useState } from "react"
import { IDayForecast, IForecast } from "../api/WeatherApi";
import Forecast from "./Forecast"

interface WeatherLayoutProps {
    forecast: IForecast | null,
    city: string,
    error: Error | null
}

function WeatherLayout(props:WeatherLayoutProps) {

    if(props.error) throw props.error;

    return (
        
        <div>
            <Forecast forecast={props.forecast}/>
        </div>
    );
}

export default WeatherLayout