import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { ProjectReflection } from "./common/projectReflection";

export default function configureStore(
  reflection: ProjectReflection | null = null
) {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    { projectReducer: { reflection } },
    composeEnhancer(applyMiddleware(thunk))
  );

  return { store };
}
