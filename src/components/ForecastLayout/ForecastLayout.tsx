import React, { useState } from "react";
import { IForecast } from "../../api/WeatherApi";
import Forecast from "./Forecast/Forecast";

interface WeatherLayoutProps {
  forecast: IForecast | null;
  error: Error | null;
}

function ForecastLayout(props: WeatherLayoutProps) {
  if (props.error) throw props.error;

  return (
    <div>
      <Forecast forecast={props.forecast} />
    </div>
  );
}

export default ForecastLayout;
