import {NO_SETTINGS_FOUND, SAVE_SETTINGS, SETTINGS_LOADED} from "../actions/settings_actions";

const initialState = {
    settings: {
        timeBetweenSmokes: 3600,
        tabacBrand: {
            name: 'Gauloises Rood',
            price: 6.40,
            contents: 20
        }
    },
    isNewUser: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SETTINGS_LOADED: {
            const settings = action.payload;
            return {
                ...state,
                settings: {
                    ...settings
                },
                isNewUser: false
            };
        }
        case SAVE_SETTINGS: {
            return {
                ...state,
                settings: action.payload
            };
        }
        case NO_SETTINGS_FOUND: {
            return {
                ...state,
                isNewUser: true
            }
        }
        default:
            return state;
    }
}
