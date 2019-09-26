import {getLastSmokeEvent, getSettings} from "./redux/selectors";
import React, {useState} from "react";
import * as moment from "moment";
import {connect} from "react-redux";

let interval;
let unmount = false;

const mapStateToProps = state => {
    const settings = getSettings(state);
    const smokeEvent = getLastSmokeEvent(state);
    return {smokeEvent, settings};
};

const mapDispatchToProps = () => {
    return ({
        unmount: true
    })
};

const formatText = (timestamp, timeBetweenSmokes, setMsg, setDiff) => {

    const last = moment(timestamp);
    const next = moment.utc().subtract(timeBetweenSmokes, 'seconds');
    const diff = Math.round(last.diff(next)/1000);
    let seconds = Math.abs(diff);
    const days = Math.floor(seconds/(60*60*24));
    seconds -= days * (60*60*24);
    const hours = Math.floor(seconds/(60*60));
    seconds -= hours * (60*60);
    const minutes = Math.floor(seconds/(60));
    seconds -= minutes * (60);
    let text = '';
    if (days > 0) {
        text += days + ' days '
    }
    if (hours > 0) {
        text += hours + ' hours '
    }
    if (minutes > 0) {
        text += minutes + ' minutes and '
    }
    text += seconds + ' seconds';
    if (!unmount) {
        setMsg(text);
        setDiff(diff);
    }
};

const useEffect = (smokeEvent, settings, setMsg, setDiff) => {
    clearInterval(interval);
    interval = setInterval(() => {
        formatText(smokeEvent.timestamp, settings.timeBetweenSmokes, setMsg, setDiff);
    }, 1000);
    return () => {
        clearInterval(interval);
    }
};

const SmokeEventCountDown = ({ smokeEvent, settings }) => {
    const [msg, setMsg] = useState('');
    const [diff, setDiff] = useState(0);
    useEffect(smokeEvent, settings, setMsg, setDiff);
    if (msg !== '') {
        if (smokeEvent && smokeEvent.timestamp) {
            if (diff >= 0) {
                return <div>Wait for {msg} before next smoke.</div>;
            } else {
                return <div>Good work: {msg} passed last smoke.</div>;
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SmokeEventCountDown);