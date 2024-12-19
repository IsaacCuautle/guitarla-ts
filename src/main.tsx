import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';

//! Assertion not null O Non null assertion operator !
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)