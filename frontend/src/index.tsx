import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind CSS styles
import App from "./pages/App"; // Main App Component

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


