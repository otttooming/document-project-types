import { createAction } from "redux-actions";
import { Dispatch } from "redux";

const ns: string = "sidebar/";

export const setActiveViewRequest = createAction(
  `${ns}GET_PERSONS_REQUEST`
);

export const setActiveView = (name: string | null) => {
  return (dispatch: Dispatch) => {
    dispatch(setActiveViewRequest(name));
  };
};
