import React from 'react'

import './MapsContainer.css'
import Maps from './Maps'
import { useNavigate } from 'react-router-dom';

const MapsContainer = (props) => {
    const navigate = useNavigate();
  return (
    <div className="page3-container">
      <div className="page3-map">
        <div onClick={() => navigate("/main")} className="page3-text">Trash Cam</div>
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/624cab44-fcd3-4eda-a626-f8cf1315587b?org_if_sml=1770&amp;force_format=original"
          alt="Rectangle132423"
          className="page3-rectangle13"
        />
        <div onClick={() => navigate("/main")} className="page3-text01">
          <span>Scan</span>
        </div>
        <div onClick={() => navigate("/")} className="page3-text03">
          <span>History</span>
        </div>
        <div onClick={() => navigate("/maps")} className="page3-text05">
          <span>Map</span>
        </div>
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/19ce31f8-18e3-4708-af9f-d1994eb8003f?org_if_sml=1487&amp;force_format=original"
          alt="Rectangle142424"
          className="page3-rectangle14"
        />
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/89d42cd0-7c09-4779-9c1f-66f13f2178c6?org_if_sml=14410&amp;force_format=original"
          alt="Rectangle152426"
          className="page3-rectangle15"
        />
        <div className="page3-image23">
            <Maps />
        </div>
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/ea80f9a0-a71f-422f-a59c-ec7a04544d7c?org_if_sml=1485&amp;force_format=original"
          alt="Rectangle172427"
          className="page3-rectangle17"
        />
        <img
          src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/b5909890-fcf8-4ca0-ad70-50af423dcd80/31df9f68-9f2a-4d7c-b926-a6774bb6e782?org_if_sml=1479&amp;force_format=original"
          alt="Rectangle182427"
          className="page3-rectangle18"
        />
        <span className="page3-text07">
          <span>All Waste</span>
        </span>
        <span className="page3-text09">
          <span>My Waste</span>
        </span>
        <div onClick={() => navigate("/")} className="page3-text11">
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default MapsContainer
