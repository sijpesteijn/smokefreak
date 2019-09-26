import {KEYCLOAK_AUTHENTICATED} from "../actions/authentication_actions";

const initialState = {
    authenticated: false,
    keycloak: undefined
};

export default function(state = initialState, action) {
    switch (action.type) {
        case KEYCLOAK_AUTHENTICATED: {
            const keycloak = action.payload;
            return {
                ...state,
                keycloak: keycloak,
                authenticated: true
            };
        }
        default:
            return state;
    }
}
