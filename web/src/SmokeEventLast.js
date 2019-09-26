import {getLastSmokeEvent} from "./redux/selectors";
import {connect} from "react-redux";
import React from "react";
import Moment from "react-moment";

const mapStateToProps = state => {
    const smokeEvent = getLastSmokeEvent(state);
    return {smokeEvent};
};

const LastSmokeEvent = ({smokeEvent}) => {
    if (smokeEvent && smokeEvent.timestamp) {
        const event = `${smokeEvent.timestamp || ''}`;
        return <div><h2>Last time: <Moment fromNow>{event}</Moment></h2></div>;

    } else {
        return <h2>None smoked</h2>;
    }
};

export default connect(mapStateToProps)(LastSmokeEvent);