import { combineReducers } from "redux";

import dashboardReducer, {
  DashboardState,
} from "./views/dashboard/dashboardReducer";

import sidebarReducer, { SidebarState } from "./views/sidebar/sidebarReducer";
import searchReducer, { SearchState } from "./views/search/searchReducer";

const rootReducer = combineReducers({
  dashboardReducer,
  sidebarReducer,
  searchReducer,
});

export interface GlobalState {
  dashboardReducer: DashboardState;
  sidebarReducer: SidebarState;
  searchReducer: SearchState;
}

export default rootReducer;
