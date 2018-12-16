import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "./store";
import { ThemeProvider } from "./common/styled";
import { theme } from "./common/styled/theme";
import { specs } from "./common/specs";
import SidebarView from "./views/sidebar/sidebarWrapper";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const rootStore = configureStore(specs);

  return (
    <Provider store={rootStore.store}>
      <ThemeProvider theme={theme}>
        <SidebarView />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
