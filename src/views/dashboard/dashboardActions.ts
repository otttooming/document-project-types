import { createAction } from "redux-actions";
import { Dispatch } from "redux";

const ns: string = "dashboard/";

export const setActiveComponentNameRequest = createAction(
  `${ns}GET_PERSONS_REQUEST`
);

export const setActiveComponentName = (name: string | null) => {
  return (dispatch: Dispatch) => {
    dispatch(setActiveComponentNameRequest(name));
  };
};
