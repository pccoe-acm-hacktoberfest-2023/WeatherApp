import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {useState} from "react";
export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "57e39b434e35e651ba45b102a06fcb1b";

    let getAWeatherInfo = async() => {

            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
    };
    let handleChange = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {

            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getAWeatherInfo();
            updateInfo(newInfo);

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange} required />
            <br></br><br></br>
            <Button variant="contained" type="submit" >Search</Button>
            </form>
        </div>
    );
}