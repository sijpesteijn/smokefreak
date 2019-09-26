import React from 'react';
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {getAllowedToSmoke, getLastSmokeEvent, getSettingsState} from "./redux/selectors";
import store from './redux/store'
import * as moment from "moment";
import {addSmokeEvent, AllowedToSmoke} from "./redux/actions/smoke_event_actions";

let interval;

const mapStateToProps = state => {
    const settings = getSettingsState(state);
    const smokeEvent = getLastSmokeEvent(state);
    const color = getAllowedToSmoke(state) ? 'success' : 'danger';
    return {smokeEvent, settings, color};
};

const isAllowedToSmoke = (lastSmokeEvent, interval) => {
    if (!lastSmokeEvent) {
        return true;
    } else {
        let fromCreated = moment.utc(lastSmokeEvent.timestamp).add(interval, 's');
        return fromCreated.diff(moment.utc(), 'seconds') < 0;
    }
};

const useEffect = (smokeEvent, settings) => {
    clearInterval(interval);
    interval = setInterval(() => {
        store.dispatch(AllowedToSmoke(isAllowedToSmoke(smokeEvent, settings.timeBetweenSmokes)));
    }, 1000);
    return () => clearInterval(interval);
};

const SmokeEventRegister = ({smokeEvent, settings, color}) => {
    const onClick = () => store.dispatch(addSmokeEvent({'timestamp': new Date()}));
    useEffect(smokeEvent, settings);
    return (
        <div>
            <Button size="sm" color={color} onClick={onClick}>Smoked one</Button>
        </div>
    )
};

export default connect(mapStateToProps, {addSmokeEvent})(SmokeEventRegister);