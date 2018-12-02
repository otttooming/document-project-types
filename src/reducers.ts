import { combineReducers } from "redux";

import dashboardReducer, {
  DashboardState,
} from "./views/dashboard/dashboardReducer";

import sidebarReducer, { SidebarState } from "./views/sidebar/sidebarReducer";

const rootReducer = combineReducers({
  dashboardReducer,
  sidebarReducer,
});

export interface GlobalState {
  dashboardReducer: DashboardState;
  sidebarReducer: SidebarState;
}

export default rootReducer;
