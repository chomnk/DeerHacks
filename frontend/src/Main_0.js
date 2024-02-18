import React, { useEffect } from 'react'
import axios from 'axios';
import './Main.css'
import Webcam from "react-webcam";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState, useRef } from "react"; // import useCallback
import { useNavigate } from 'react-router-dom';


import './Main_0.css'

const Main_0 = (props) => {
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
    <div className="page2-container">
      <div className="page2-home-page-scan-main">
        <span className="page2-text">Trash Cam</span>
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/3aa4fcd0-013b-40c0-9b71-ed79c21652d8?org_if_sml=1140&amp;force_format=original"
          alt="Rectangle92016"
          className="page2-rectangle9"
        />
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/753d102c-575b-4452-b4a7-e8e5b52e0a76?org_if_sml=1140&amp;force_format=original"
          alt="Rectangle112017"
          className="page2-rectangle11"
        />
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/7b495ba1-74bd-4c69-b60e-175d73fe28aa?org_if_sml=1143&amp;force_format=original"
          alt="Rectangle102017"
          className="page2-rectangle10"
        />
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/51450a1d-8680-4b5f-aedc-fcc6c8ca78ff?org_if_sml=1777&amp;force_format=original"
          alt="Rectangle132017"
          className="page2-rectangle13"
        />
        <span className="page2-text01">
          <span>Scan</span>
        </span>
        <span className="page2-text03">
          <span>Profile</span>
        </span>
        <span className="page2-text05">
          <span>Map</span>
        </span>
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/c067933a-5e18-4981-bf67-d2481a1e767f?org_if_sml=1487&amp;force_format=original"
          alt="Rectangle142219"
          className="page2-rectangle14"
        />
        <span className="page2-text07">Sign Out</span>

        <Webcam className="page2-image21" height={500} width={900} ref={webcamRef} />
        <span className="page2-text08">
          <span className="page2-text09">
            Your object is an
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="page2-text10">apple</span>
          <span className="page2-text11">
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <br className="page2-text12"></br>
          <span className="page2-text13">
            which belongs in the
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="page2-text14">recycling bin*</span>
          <span className="page2-text15">.</span>
        </span>
        <div className="page2-frame1">
          <img
            src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/58cdab5f-f0ea-4f58-9c93-6d1cc4dcbd03?org_if_sml=12237&amp;force_format=original"
            alt="image222421"
            className="page2-image22"
          />
        </div>
        <div className="page2-report">
          <span className="page2-text16">
            <span>Report</span>
          </span>
        </div>
        <span className="page2-text18">
          <span className="page2-text19">
            *Incorrect?
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="page2-text20">Try again.</span>
        </span>
      </div>
    </div>
  )
}

export default Main_0;
