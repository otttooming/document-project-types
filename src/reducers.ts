import { combineReducers } from "redux";

import projectReducer, { ProjectState } from "./common/project/projectReducer";
import dashboardReducer, {
  DashboardState,
} from "./views/dashboard/dashboardReducer";

import sidebarReducer, { SidebarState } from "./views/sidebar/sidebarReducer";
import searchReducer, { SearchState } from "./views/search/searchReducer";

const rootReducer = combineReducers({
  projectReducer,
  dashboardReducer,
  sidebarReducer,
  searchReducer,
});

export interface GlobalState {
  projectReducer: ProjectState;
  dashboardReducer: DashboardState;
  sidebarReducer: SidebarState;
  searchReducer: SearchState;
}

export default rootReducer;
