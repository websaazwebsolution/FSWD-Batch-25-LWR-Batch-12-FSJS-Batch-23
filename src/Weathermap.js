import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { MapContainer, TileLayer , Marker , Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

function Weathermap() {
    const [weatherData, setWeatherData] = useState([])
    const [mapCenter, setMapCenter] = useState({lat: 51.505, lng: -0.09})
    const API_KEY = "1e76ea17f03b5588fa697c8571424938";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
     useEffect(() => {
            const cites = [
                { name: "London", lat: 51.5074, lon: -0.1278 },
                { name: "New York", lat: 40.7128, lon: -74.006 },
                { name: "Sydney", lat: -33.8688, lon: 151.2093 },
                { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
                { name: "Dubai", lat: 25.276987, lon: 55.296249 },
                { name: "Paris", lat: 48.8566, lon: 2.3522 },
                { name: "Singapore", lat: 1.3521, lon: 103.8198 },
                { name: "Mumbai", lat: 19.076, lon: 72.8777 },
                { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
                { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
                {name:"Karachi", lat: 24.8607, lon: 67.0011},
            ];
         const fetcWeather = async () => {
            const data = await Promise.all(
                cites.map((city)=>{
                    return axios.get(API_URL, {
                        params: {
                            lat: city.lat,
                            lon: city.lon,
                            appid: API_KEY
                        }
                    })
                })
            );
            setWeatherData(data.map((res)=> res.data));
    };
    fetcWeather();
    }, []);
    console.log(weatherData);

  return (
   <MapContainer center={mapCenter} zoom={3} style={{height: "100vh"}}>
       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         {weatherData.map((data, index) => (
              <Marker key={index} position={[data.coord.lat, data.coord.lon]}>
                <Popup>
                     <h3>{data.name}</h3>
                     <p>{data.weather[0].description}</p>
                    
                </Popup>
              </Marker>
         ))}
    </MapContainer>
  )
}

export default Weathermap