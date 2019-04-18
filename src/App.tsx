import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "./store";
import { ThemeProvider, GlobalStyles } from "./common/styled";
import { theme } from "./common/styled/theme";
import SidebarView from "./views/sidebar/sidebarWrapper";
import { GitHubConfig } from "./common/config/configReducer";
import { ProjectReflection } from "./common/projectReflection";

export interface AppProps {
  reflection?: ProjectReflection;
  git?: GitHubConfig;
  activeComponentName?: string;
}

const App: React.SFC<AppProps> = props => {
  const { reflection, git, activeComponentName } = props;
  const rootStore = configureStore(reflection, git, activeComponentName);

  return (
    <Provider store={rootStore.store}>
      <ThemeProvider theme={theme}>
        <>
          <SidebarView />
          <GlobalStyles />
        </>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
