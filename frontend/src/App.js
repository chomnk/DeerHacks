import logo from './logo.svg';
import './App.css';
import Camera from './Camera';
import React from 'react';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Camera Capture</h1>
                <Camera />
            </header>
        </div>
    );
}

export default App;

