import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import ThemeInterface from "./theme";

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  createGlobalStyle,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

const GlobalStyles = createGlobalStyle`
  body {
    @import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css);
  }

  code {
    font-family: "Fira Code", monospace !important;
  }
`;

export { css, keyframes, ThemeProvider, GlobalStyles };
export default styled;
