import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RiderProvider } from "./context/RiderContext"; // import context

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RiderProvider>
        <App />
      </RiderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
