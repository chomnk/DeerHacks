import React from 'react'
import axios from 'axios';
import './Main.css'
import Camera from './Camera';
import Webcam from "react-webcam";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState, useRef } from "react"; // import useCallback


const Main = (props) => {
    const webcamRef = useRef(null);
    const user = props.user;
    const isAuthenticated = props.isAuthenticated;
    const isLoading = props.isLoading;

    const handleReportClick = () => {
        // This takes a screenshot and store as an image
        const imageSrc = webcamRef.current.getScreenshot();

        try {
            // This sends a POST request to the backend with the json containting the image in base64
            const response = axios.post("http://localhost:5001/classify", {"ImageData": imageSrc.split(',')[1]});
            response.then((res) => console.log(res.data));
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
                <button type="button" onClick={() => handleReportClick()} className="home-button button">Report</button>
                <span className="home-text05">
                This is a &#123;GarbageType&#125; garbage.
                </span>
            </div>
            </div>
            <div className="home-container4">
            <span className="home-text06">Your Scan History</span>
            <ul className="home-ul list">
                <li className="list-item">
                <span className="home-text07">Text</span>
                </li>
                <li className="list-item">
                <span className="home-text08">Text</span>
                </li>
                <li className="list-item">
                <span className="home-text09">Text</span>
                </li>
            </ul>
            </div>
        </div>
        </div>
    )
}

export default Main
