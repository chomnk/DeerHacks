import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className="App">
        <Auth0Provider
            domain="dev-7djeqz7vox1me0py.us.auth0.com"
            clientId="SmA7RJxj54obbOWcfQhpSqz1S40sKtbx"
            authorizationParams={{redirect_uri: "http://localhost:3000/main"}}
        ><AppRouter /></Auth0Provider>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
