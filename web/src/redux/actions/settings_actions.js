import axios from 'axios';

export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SETTINGS_LOADED = 'SETTINGS_LOADED';
export const SETTINGS_SAVED = 'SETTINGS_SAVED';
export const SETTINGS_LOAD_FAILURE = 'SETTINGS_LOAD_FAILURE';
export const SETTINGS_SAVE_FAILURE = 'SETTINGS_SAVE_FAILURE';
export const NO_SETTINGS_FOUND = 'NO_SETTINGS_FOUND';

export const SettingsLoaded = payload => ({
    type: SETTINGS_LOADED,
    payload: payload
});

export const SettingsSaved = payload => ({
    type: SETTINGS_SAVED,
    payload: payload
});

export const SettingsLoadFailure = error => ({
    type: SETTINGS_LOAD_FAILURE,
    payload: error
});

export const SettingsSaveFailure = error => ({
    type: SETTINGS_SAVE_FAILURE,
    payload: error
});

export const NoSettingsFound = () => ({
    type: NO_SETTINGS_FOUND,
});

const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export const SaveSettings = (payload) => {
    return (dispatch) => {
        axios.post(`/api/settings`, JSON.stringify(payload), options)
            .then(dispatch(SettingsSaved(payload)))
            .catch(error => {
                dispatch(SettingsSaveFailure(error));
            });
    }
};

export const fetchSettings = () => {
    return (dispatch) => {
        axios.get(`/api/settings`)
            .then(res => {
                dispatch(SettingsLoaded(res.data));
            })
            .catch(error => {
                if (error.response.status === 404) {
                    dispatch(NoSettingsFound());
                } else {
                    dispatch(SettingsLoadFailure(error));
                }
            });
    }
};
