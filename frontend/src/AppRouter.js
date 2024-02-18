import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Main from './Main';
import Maps from './Maps';

const AppRouter = () => {
    const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

    const LoginElement = <Login loginWithRedirect={loginWithRedirect} user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} />

    return (
        <Router>
            <Routes>
                <Route path="/" element={ LoginElement } />
                <Route path="/main" element={<Main user={user} isAuthenticated={isAuthenticated} isLoading={isLoading}/>} />
                <Route path="/maps" element={<Maps />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
