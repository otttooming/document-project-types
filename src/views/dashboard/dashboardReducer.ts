import { handleActions, Action } from "redux-actions";
import { ProjectReflection } from "../../common/projectReflection";

class State {}

export default handleActions<State, any>({}, new State());

export { State as DashboardState };
