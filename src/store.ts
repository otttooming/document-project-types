import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { ProjectReflection } from "./common/projectReflection";
import { GitHubConfig } from "./common/config/configReducer";

export default function configureStore(
  reflection: ProjectReflection | null = null,
  gitHub: GitHubConfig | null = null,
  activeComponentName: string | null = null
) {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    {
      projectReducer: { reflection, activeComponentName },
      configReducer: { gitHub },
    },
    composeEnhancer(applyMiddleware(thunk))
  );

  return { store };
}
