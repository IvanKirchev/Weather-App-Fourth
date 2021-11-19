import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import react from "react";
import { IHourForecast } from "../../../../api/WeatherApi";

interface IHourForecastProps {
  hourForecast: IHourForecast | null;
}

function HourlyForecast(props: IHourForecastProps) {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: "80%",
    position: "relative",
    top: "12%",
  });

  return (
    <div>
      <Box textAlign="left" sx={{ width: "55rem", marginLeft: "27%" }}>
        <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography sx={{ width: 128, height: 128 }}>
                <Img
                  alt="complex"
                  src={`http://openweathermap.org/img/w/${props.hourForecast?.weather[0].icon}.png`}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5" component="div">
                    {props.hourForecast
                      ? Math.round(props.hourForecast?.main.temp * 10) / 10
                      : 0}{" "}
                    °C
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Feels like{" "}
                    {props.hourForecast
                      ? Math.round(props.hourForecast?.main.feels_like * 10) /
                        10
                      : 0}{" "}
                    °C
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Humidity: {props.hourForecast?.main.humidity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Wind: {props.hourForecast?.wind.speed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pressure: {props.hourForecast?.main.pressure}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs>
                <Typography variant="h6" component="div">
                  {props.hourForecast?.weather[0].description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  position="relative"
                  top="56%"
                  left="35%"
                >
                  {props.hourForecast
                    ? new Date(
                        props.hourForecast?.dt * 1000
                      ).toLocaleDateString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        timeZoneName: "short"
                      })
                    : null}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default HourlyForecast;
