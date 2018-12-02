import * as React from "react";
import DashboardView from "./views/dashboard/dashboardWrapper";
import { injectGlobal } from "./common/styled";
import { reset } from "./common/styled/reset";
import { Provider } from "react-redux";
import configureStore from "./store";
import { ThemeProvider } from "./common/styled";
import { theme } from "./common/styled/theme";
import { specs } from "./common/specs";
import SidebarView from "./views/sidebar/sidebarWrapper";

injectGlobal`
  ${reset}
  html {
    font-family: 'Montserrat', sans-serif;
  }
  body {
    background: linear-gradient(to right, #F8F8FB, #F8F8FB);
  }
`;

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
