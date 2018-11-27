import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

const root: HTMLElement | null = document.getElementById("app");

(async function init() {
  ReactDOM.render(<App />, root);
})();
