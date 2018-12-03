import { createAction } from "redux-actions";
import { Dispatch } from "redux";

const ns: string = "routing/";

export const setActiveViewRequest = createAction(
  `${ns}SET_ACTIVE_VIEW_REQUEST`
);

export const setActiveView = (name: string | null) => {
  return (dispatch: Dispatch) => {
    dispatch(setActiveViewRequest(name));
  };
};
