import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";

export default function InfoBox({ info, darkMode }) {
    const HOT_URL = "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const COLD_URL = "https://plus.unsplash.com/premium_photo-1676573201503-f1f0354bb387?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const RAIN_URL = "https://plus.unsplash.com/premium_photo-1666726664307-707a74015ca4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className={`info-box ${darkMode ? 'dark' : ''}`}>
            <Card className="weather-card">
                <CardMedia
                    className="card-media"
                    image={info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL}
                    title="Weather image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="city-name">
                        {info.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="weather-info">
                        <p>Temperature: <b>{info.temp}°C</b></p>
                        <p>Feels-like: <b>{info.feelsLike}°C</b></p>
                        <p>Max Temperature: <b>{info.tempMax}°C</b></p>
                        <p>Min Temperature: <b>{info.tempMin}°C</b></p>
                        <p>Weather: <b>{info.weather}</b></p>
                        <p>Humidity: <b>{info.humidity}%</b></p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}