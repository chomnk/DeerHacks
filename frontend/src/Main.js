import React from 'react'
import axios from 'axios';
import './Main.css'
import Webcam from "react-webcam";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState, useRef } from "react"; // import useCallback


const Main = (props) => {
    const webcamRef = useRef(null);
    const user = props.user;
    const isAuthenticated = props.isAuthenticated;
    const isLoading = props.isLoading;

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [GarbageType, setGarbageType] = useState("");
    const [GarbageBin, setGarbageBin] = useState("");
    const [items, setItems] = useState([]);

    const [isScanDisabled, setIsScanDisabled] = useState(false);
    const [isReportDisabled, setIsReportDisabled] = useState(true);
    const [ScanButtonText, setScanButtonText] = useState("Scan")
    const [DisplayText, setDisplayText] = useState("")

    const handleReportClick = () => {
        // This takes a screenshot and store as an image
        const imageSrc = webcamRef.current.getScreenshot();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (err) => {
                console.error(err.message);
            }
        );

        try {
            const response = axios.post("http://localhost:5001/report", 
                {
                    "lat": location.latitude,
                    "lon": location.longitude,
                    "type": GarbageType
                }
            );
            response.then((res) => {
                //append to scan history list
                setItems([...items, GarbageType])
                //
                setIsScanDisabled(false);
                setScanButtonText("Scan");
                setIsReportDisabled(true);
                setDisplayText("");
            });
        } catch (error) {
            console.error(error);
        }
    }
    

    const handleScanClick = () => {
        // This takes a screenshot and store as an image
        const imageSrc = webcamRef.current.getScreenshot();

        try {
            // This sends a POST request to the backend with the json containting the image in base64
            const response = axios.post("http://localhost:5001/classify", 
                {
                    "ImageData": imageSrc.split(',')[1],
                }
            );
            response.then((res) => {
                setGarbageType(res.data.type);
                setGarbageBin(res.data.bin);
                setIsReportDisabled(true);
                setScanButtonText("Cancel");
                setDisplayText(`This is a ${GarbageType} garbage.`);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="home-container">
        <div className="home-container1">
            <div className="home-sidebar">
            <nav className="home-nav">
                <img
                alt="image"
                src="https://presentation-website-assets.teleporthq.io/logos/logo.png"
                className="home-image"
                />
                <span className="home-text">Scan</span>
                <span className="home-text01">Garbage Map</span>
                <span className="home-text02">Profile</span>
                <span className="home-text03">Usage Guide</span>
                <span className="home-text04">Log Out</span>
            </nav>
            </div>
            <div className="home-container2">
                <Webcam className="home-video" height={600} width={700} ref={webcamRef} />
            <div className="home-container3">
                <span className="home-text05">
                    {DisplayText}
                </span>
            </div>
            <div className="home-container4">
            <button type="button" onClick={() => handleScanClick()} className="home-button button">
              {ScanButtonText}
            </button>
            <button type="button" onClick={() => handleReportClick()} className="home-button1 button">
              Report
            </button>
          </div>
            </div>
            <div className="home-container5">
            <span className="home-text06">Your Scan History</span>
            <ul className="home-ul list">
                {items.map((item, index) => (
                    <li key={index} className="list-item">
                        <span className="home-text07">{`You scanned a ${item}.`}</span>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    )
}

export default Main
