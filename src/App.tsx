import * as React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
import StyledFrame from "react-styled-frame";
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

class App extends React.PureComponent<AppProps, any> {
  store: Store;

  constructor(props: AppProps) {
    super(props);

    const { reflection, git, activeComponentName } = props;

    this.store = configureStore(reflection, git, activeComponentName);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledFrame style={{ width: "100%", height: "100%" }}>
          <Provider store={this.store}>
            <SidebarView />
            <GlobalStyles />
          </Provider>
        </StyledFrame>
      </ThemeProvider>
    );
  }
}

export default App;
