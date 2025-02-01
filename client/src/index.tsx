import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { DarkModeProvider } from "./DarkModeContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
