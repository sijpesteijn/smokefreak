export const getAuthenticationState = store => store.authentication;

export const getSmokeEventsState = store => store.smoke_events;

export const getSmokeEventList = store =>
    getSmokeEventsState(store) ? getSmokeEventsState(store).smokeEvents : [];

export const getLastSmokeEvent = store =>
    getSmokeEventsState(store) && getSmokeEventsState(store).smokeEvents && getSmokeEventsState(store).smokeEvents.length > 0 ? getSmokeEventsState(store).smokeEvents[0] : {};

export const getAllowedToSmoke = store => getSmokeEventsState(store) ? getSmokeEventsState(store).allowedToSmoke : false;


export const getSettingsState = store => store.settings;

export const getSettings = store => getSettingsState(store) ? getSettingsState(store).settings : {
    timeBetweenSmokes: 3600,
    tabacBrand: {
        name: 'Gauloises Rood',
        price: 6.40,
        contents: 20
    }
};

export const isNewUser = store => getSettingsState(store) ? getSettingsState(store).isNewUser : false;