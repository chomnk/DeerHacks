import React from 'react'

import './Main.css'
import Camera from './Camera';

const Main = (props) => {
    const user = props.user;
    const isAuthenticated = props.isAuthenticated;
    const isLoading = props.isLoading;

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
                <Camera className="home-video" user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} />
            <div className="home-container3">
                <button type="button" className="home-button button">
                Report
                </button>
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
