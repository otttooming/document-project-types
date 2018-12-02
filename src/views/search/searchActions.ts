import { createAction } from "redux-actions";
import { Dispatch } from "redux";
import { SearchQuery } from "./searchReducer";

const ns: string = "search/";

export const findReflectionRequest = createAction(`${ns}FIND_REFLECTION`);

export const findReflection = (query: SearchQuery) => {
  return (dispatch: Dispatch) => {
    dispatch(findReflectionRequest(query));
  };
};
