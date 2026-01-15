import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";   // Must match the file name exactly
import "./App.css";            // Your CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
