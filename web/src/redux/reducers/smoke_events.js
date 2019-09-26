import {ADD_SMOKE_EVENT, ALLOWED_TO_SMOKE, SMOKE_EVENTS_LOADED} from "../actions/smoke_event_actions";

const initialState = {
    smokeEvents: [],
    allowedToSmoke: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_SMOKE_EVENT: {
            const smokeEvent = action.payload;
            return {
                ...state,
                smokeEvents: [
                    ...state.smokeEvents,
                    smokeEvent
                ]
            };
        }
        case SMOKE_EVENTS_LOADED: {
            const se = action.payload;
            return {
                ...state,
                smokeEvents: se
            }
        }
        case ALLOWED_TO_SMOKE: {
            return {
                ...state,
                allowedToSmoke: action.payload
            }
        }
        default:
            return state;
    }
}
