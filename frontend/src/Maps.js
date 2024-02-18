import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import './Maps.css'

const Maps = () => {

    const [locations, setLocations] = useState([])

    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();

    const handleMarkerClick = (location) => {
        const lat = location.lat;
        const lon = location.lon;
        mapRef?.panTo({ lat, lon });
        const type = location.type;
        const time = location.timestamp;
        setInfoWindowData({ type, time });
        setIsOpen(true);
    };

    useEffect(() => {
        const response = axios.post("http://localhost:5001/locations");
        response.then((res) => {
            setLocations(res.data);
        }
    )})

    const { isLoaded } = useLoadScript({
        //googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        googleMapsApiKey: "AIzaSyBxe0pGGl9NAdTtLAX6jUdtDZ0lhyM-vzw"
    });
    const center = useMemo(() => ({ lat: 43.550278905550954, lng: -79.66573178675947 }), []);

    return (
        <div className="Test">
            <div className="App">
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                <GoogleMap
                    mapContainerClassName="App"
                    center={center}
                    zoom={15}
                >
                    {locations.map((location, index) => (
                        <Marker 
                            key={index} 
                            position={{ lat: location.lat, lng: location.lon }} 
                            onClick={() => {handleMarkerClick(location)}}
                        />
                        {isOpen infoWindowData.id == ind && (
                            <InfoWindow
                              onCloseClick={() => {
                                setIsOpen(false);
                              }}
                            >
                              <h3>{infoWindowData.address}</h3>
                            </InfoWindow>
                        )}
                    ))}
                </GoogleMap>


                )}
            </div>
        </div>
    );
};


export default Maps;
  

