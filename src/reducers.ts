import { combineReducers } from "redux";

import projectReducer, { ProjectState } from "./common/project/projectReducer";
import configReducer, { ConfigState } from "./common/config/configReducer";
import routingReducer, { RoutingState } from "./common/routing/routingReducer";
import dashboardReducer, {
  DashboardState,
} from "./views/dashboard/dashboardReducer";

import sidebarReducer, { SidebarState } from "./views/sidebar/sidebarReducer";
import searchReducer, { SearchState } from "./views/search/searchReducer";

const rootReducer = combineReducers({
  projectReducer,
  configReducer,
  routingReducer,
  dashboardReducer,
  sidebarReducer,
  searchReducer,
});

export interface GlobalState {
  projectReducer: ProjectState;
  configReducer: ConfigState;
  routingReducer: RoutingState;
  dashboardReducer: DashboardState;
  sidebarReducer: SidebarState;
  searchReducer: SearchState;
}

export default rootReducer;
