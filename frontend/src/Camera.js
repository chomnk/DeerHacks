import React, { useRef, useEffect } from 'react';
import axios from 'axios';

import Webcam from "react-webcam";
import { useCallback, useState } from "react"; // import useCallback

const Camera = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = () => {
    // This takes a screenshot and store as an image
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      // This sends a POST request to the backend with the json containting the image in base64
      const response = axios.post("http://localhost:5001/classify", {"ImageData": imageSrc.split(',')[1]});
      response.then((res) => console.log(res.data))

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Webcam height={600} width={600} ref={webcamRef} />
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
};

export default Camera;
