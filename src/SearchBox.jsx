import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [loading, setLoading] = useState(false);  // Loading state
    let [error, setError] = useState("");  // Error message state

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "57e39b434e35e651ba45b102a06fcb1b";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) throw new Error("Please Enter Valid City Name");  // Handle failed responses
            let jsonResponse = await response.json();
            return {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
        } catch (error) {
            setError(error.message);  // Set error message
            return null;
        }
    };

    let handleChange = (event) => {
        setCity(event.target.value);
        setError("");  // Clear previous errors
    };

    let handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);  // Start loading
        let newInfo = await getWeatherInfo();
        if (newInfo) updateInfo(newInfo);  // Update weather info if successful
        setLoading(false);  
        setCity("");  
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Search"}
                </Button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}  {/* Display error message */}
        </div>
    );
}
