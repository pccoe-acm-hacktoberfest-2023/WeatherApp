import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { useState, useEffect } from "react";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Fetching...",
        feelsLike: 0,
        humidity: 0,
        temp: 0,
        tempMax: 0,
        tempMin: 0,
        weather: "Loading...",
    });

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "57e39b434e35e651ba45b102a06fcb1b";

    // Function to fetch weather data based on latitude and longitude
    const getWeatherByLocation = async (lat, lon) => {
        try {
            const response = await fetch(
                `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) throw new Error("Failed to fetch weather data");

            const jsonResponse = await response.json();
            setWeatherInfo({
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            });
        } catch (error) {
            console.error("Error fetching weather by location:", error);
            setWeatherInfo((prev) => ({
                ...prev,
                city: "Unable to detect location",
                weather: "Error fetching data",
            }));
        }
    };

    // Automatically fetch weather on load using Geolocation API
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeatherByLocation(latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setWeatherInfo((prev) => ({
                        ...prev,
                        city: "Location permission denied",
                        weather: "Unable to fetch location data",
                    }));
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    // Update weather info when the user searches for a new city
    const updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <div>
            <h2>Welcome to the WeatherApp</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}
