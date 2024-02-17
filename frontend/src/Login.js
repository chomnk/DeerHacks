import React from "react";

const Login = (props) => {
    const loginWithRedirect = props.loginWithRedirect;
    const user = props.user;
    const isAuthenticated = props.isAuthenticated;
    const isLoading = props.isLoading;

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Login;
