import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import "./WeatherApp.css";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 39.23,
        humidity: 58,
        temp: 33.17,
        tempMax: 33.17,
        tempMin: 33.17,
        weather: "broken clouds",
    });

    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={`weather-container ${darkMode ? 'dark' : ''}`}>
                <div className="header">
                    <h2>Welcome to the WeatherApp</h2>
                    <IconButton 
                        onClick={() => setDarkMode(!darkMode)} 
                        color="inherit"
                        className="theme-toggle"
                    >
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </div>
                <SearchBox updateInfo={updateInfo} darkMode={darkMode} />
                <InfoBox info={weatherInfo} darkMode={darkMode} />
            </div>
        </ThemeProvider>
    );
}