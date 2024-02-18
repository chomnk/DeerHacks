import React, { useEffect } from 'react'
import axios from 'axios';
import './Main.css'
import Webcam from "react-webcam";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState, useRef } from "react"; // import useCallback
import { useNavigate } from 'react-router-dom';

const Main = (props) => {
    const navigate = useNavigate();
    
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
                    "garbage_type": GarbageType,
                }
            );
            response.then((res) => {
                //useEffect(() => {
                    //enable scan button
                    setIsScanDisabled(false);
                    setScanButtonText("Scan");
                    //disable report button
                    setIsReportDisabled(true);
                    setDisplayText("");
                //}, [])
            });
        } catch (error) {
            console.error(error);
        }
    }
    

    const handleScanClick = () => {
        if (ScanButtonText == "Cancel") { 
            setScanButtonText("Scan");
            setDisplayText("Your previous ")
            setIsScanDisabled(false);
            return;
        }
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
                console.log(res.data)
                //useEffect(() => {
                    setGarbageType(res.data.item);
                    setGarbageBin(res.data.category);
                    // enable report button
                    setIsReportDisabled(false);
                    setScanButtonText("Cancel");
                    (() => setDisplayText(`This is a ${GarbageType} garbage.`))();
                //}, [])
            });
            (()=> setItems([...items, GarbageType]))();
            //setDisplayText(`This is a ${GarbageType} garbage.`);
            //append to scan history list
            //setItems([...items, GarbageType])
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="home-container">
        <div className="home-container1">
            <div className="home-sidebar">
            <nav className="home-nav">
                <div className="home-text04" onClick={() => navigate("/main")}>Trash Cam</div>
                <div className="home-text" onClick={() => navigate("/main")}>Scan</div>
                <div className="home-text01" onClick={() => navigate("/maps")}>Garbage Map</div>
                <div className="home-text02" onClick={() => navigate("/profile")}>Profile</div>
                <div className="home-text" onClick={() => navigate("/")}>Log Out</div>
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
            <button type="button" onClick={() => handleScanClick()} disabled={isScanDisabled} className="home-button button">
              {ScanButtonText}
            </button>
            <button type="button" onClick={() => handleReportClick()} disabled={isScanDisabled} className="home-button1 button">
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
