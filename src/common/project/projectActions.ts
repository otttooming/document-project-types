import { createAction } from "redux-actions";
import { Dispatch } from "redux";

const ns: string = "project/";

export const setActiveComponentNameRequest = createAction(
  `${ns}SET_ACTIVE_COMPONENT_NAME_REQUEST`
);

export const setActiveComponentName = (name: string | null) => {
  return (dispatch: Dispatch) => {
    dispatch(setActiveComponentNameRequest(name));
  };
};
