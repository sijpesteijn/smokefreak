import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {fetchSettings} from "./redux/actions/settings_actions";
import Keycloak from "keycloak-js";
import SmokeFreakHeader from "./SmokeFreakHeader";

import {Switch, Route, Redirect} from 'react-router-dom';
import Home from "./home";
import About from "./about";
import Profile from "./Profile";
import axios from 'axios';
import store from './redux/store'
import {fetchSmokeEvents} from "./redux/actions/smoke_event_actions";
import {KeycloakAuthenticated} from "./redux/actions/authentication_actions";
import {getAuthenticationState, isNewUser} from "./redux/selectors";

const mapStateToProps = (state) => {
    const authenticationState = getAuthenticationState(state);
    const isNew = isNewUser(state);
    return { authenticationState, isNew }
};

const App = ({authenticationState, isNew}) => {
    if (!authenticationState || !authenticationState.authenticated) {
        const keycloak = Keycloak("/keycloak.json");
        keycloak.init({ onLoad: 'login-required' }).success(authenticated => {
            if (authenticated) {
                store.dispatch(KeycloakAuthenticated(keycloak));
                axios.interceptors.request.use(request => {
                    request.headers['Authorization'] = 'Bearer ' + keycloak.token;
                    return request;
                });
                store.dispatch(fetchSmokeEvents());
                store.dispatch(fetchSettings());
            }
        }).error(err => {
            alert(err);
        });
        setInterval(() => {
            keycloak.updateToken(70).success((refreshed) => {
                if (refreshed) {
                    console.debug('Token refreshed' + refreshed);
                } else {
                    console.warn('Token not refreshed, valid for '
                        + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }).error(() => {
                console.error('Failed to refresh token');
            });


        }, 60000);
        return <p>Loading...</p>
    } else {
        return (
            <div className="App">
                <SmokeFreakHeader></SmokeFreakHeader>
                <Switch>
                    <Route exact path="/" render={() => isNew ? (<Redirect to="/profile"/>) : (<Home/>) }/>
                    <Route path="/about" component={() => <About/> }/>
                    <Route path="/profile" component={() => <Profile/> }/>
                </Switch>
            </div>
        );
    }
};
export default connect(mapStateToProps)(App);
