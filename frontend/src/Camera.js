import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Webcam from "react-webcam";
import { useCallback, useState } from "react"; // import useCallback

const Camera = (props) => {
    const webcamRef = useRef(null);
    const user = props.user;
    const isAuthenticated = props.isAuthenticated;
    const isLoading = props.isLoading;

    const capture = () => {
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
        <Webcam height={600} width={700} ref={webcamRef} />
    );
};

export default Camera;
