import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import './Maps.css'

const Maps = () => {

    const [locations, setLocations] = useState([])

    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();

    const handleMarkerClick = (location, idx) => {
        const lat = location.lat;
        const lon = location.lon;
        mapRef?.panTo({ lat, lon });
        const type = location.type;
        const time = location.timestamp;
        setInfoWindowData({ type, time, idx });
        setIsOpen(true);
    };

    useEffect(() => {
        const response = axios.post("http://localhost:5001/locations");
        response.then((res) => {
            setLocations(res.data);
        }
    )}, [])

    const { isLoaded } = useLoadScript({
        //googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        googleMapsApiKey: "AIzaSyBxe0pGGl9NAdTtLAX6jUdtDZ0lhyM-vz" + "w"
    });
    const center = useMemo(() => ({ lat: 43.550278905550954, lng: -79.66573178675947 }), []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(2); // Get last two digits of the year
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
        return `${year}.${month}.${day}`;
    }

    return (
        <div className="Test">
            <div className="App">
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={15}
                >
                    {locations.map((location, index) => (
                        <Marker 
                            key={index} 
                            position={{ lat: location.lat, lng: location.lon }} 
                            onClick={() => {handleMarkerClick(location, index)}}
                        >
                            {isOpen && infoWindowData.idx == index && 
                                <InfoWindow onCloseClick={() => {setIsOpen(false)}}>
                                    <div>
                                        <h3>Type: {infoWindowData.type}</h3>
                                        <h3>Reported at: {infoWindowData.time.slice(0, 10)}</h3>
                                        <h3>Location: {location.lat}, {location.lon}</h3>
                                        
                                    </div>
                                </InfoWindow>
                            }
                        </Marker>
                    ))}
                </GoogleMap>


                )}
            </div>
        </div>
    );
};


export default Maps;
  

