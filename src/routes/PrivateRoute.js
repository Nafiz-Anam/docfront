import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { APICore } from '../helpers/api/apiCore';
import { useHistory } from 'react-router-dom';
/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    // const history = useHistory();
    // const api = new APICore();
    const isUserAuthenticated = () => {
        const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
        const token = loggedInUser ? loggedInUser.token : '';
        if (!loggedInUser || (loggedInUser && !loggedInUser.token)) {
            return false;
        }
        // const decoded = jwtDecode(loggedInUser.token);
        const currentTime = Date.now() / 1000;
        if (token.exp < currentTime) {
            console.warn('access token expired');
            // window.localStorage.removeItem('token')

            // history.push('/account/logout');
            return false;
        } else {
            return true;
        }
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isUserAuthenticated() === false) {
                    // not logged in so redirect to login page with the return url
                    return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
                }

                // const loggedInUser = api.getLoggedInUser();
                const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
                const adminname = loggedInUser ? loggedInUser.admin_name : '';
                // check if route is restricted by role
                if (roles && roles.indexOf(adminname) === -1) {
                    // role not authorised so redirect to home page
                    return <Redirect to={{ pathname: '/' }} />;
                }
                // authorised so return component
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
