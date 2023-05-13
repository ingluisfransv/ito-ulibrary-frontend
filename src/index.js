import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './Router';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <AppRouter />
  </UserContextProvider>,
);

reportWebVitals();
