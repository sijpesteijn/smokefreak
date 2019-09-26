import { combineReducers } from "redux";
import smoke_events from "./smoke_events";
import authentication from "./authentication";
import settings from "./settings";

export default combineReducers({ authentication, smoke_events, settings });
