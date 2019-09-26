import React from 'react';
import { getSmokeEventList } from "./redux/selectors";
import { connect } from "react-redux";
import Moment from "react-moment";

const mapStateToProps = state => {
    const smokeEvents = getSmokeEventList(state);
    return {smokeEvents};
};

const SmokeEventList = ({ smokeEvents }) => (
    <ul className="smoke-event-list">
        {smokeEvents && smokeEvents.length
            ? smokeEvents.map((smokeEvent, index) => {
                const event = `${smokeEvent.timestamp || ''}`;
                return <li key={`${smokeEvent.id}`}><Moment fromNow>{event}</Moment></li>;
            })
            : "No todos, yay!"}
    </ul>
);

export default connect(mapStateToProps)(SmokeEventList);