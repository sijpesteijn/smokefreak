export const KEYCLOAK_AUTHENTICATED = 'KEYCLOAK_AUTHENTICATED';

export const KeycloakAuthenticated = payload => ({
    type: KEYCLOAK_AUTHENTICATED,
    payload: payload
});