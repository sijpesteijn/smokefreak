import axios from 'axios';

export const SMOKE_EVENTS_LOADED = 'SMOKE_EVENTS_LOADED';
export const ALLOWED_TO_SMOKE = 'ALLOWED_TO_SMOKE';
export const SMOKE_EVENTS_LOAD_FAILURE = 'SMOKE_EVENTS_LOAD_FAILURE';
export const ADD_SMOKE_EVENT = 'ADD_SMOKE_EVENT';

export const SmokeEventsLoaded = payload => ({
    type: SMOKE_EVENTS_LOADED,
    payload: payload
});

export const SmokeEventsLoadFailure = error => ({
    type: SMOKE_EVENTS_LOAD_FAILURE,
    payload: error
});

export const AllowedToSmoke = payload => ({
    type: ALLOWED_TO_SMOKE,
    payload: payload
});

const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export const addSmokeEvent = (payload) => {
    return (dispatch) => {
        axios.post(`/smoke-events`, JSON.stringify(payload), options)
            .then(response => response.data)
            .then((data) => {
                return dispatch(fetchSmokeEvents());
            });
    }
};

export const fetchSmokeEvents = () => {
    return (dispatch) => {
        axios.get(`/smoke-events`)
            .then(res => {
                dispatch(SmokeEventsLoaded(res.data));
            })
            .catch(error => dispatch(SmokeEventsLoadFailure(error)));
    }
};
