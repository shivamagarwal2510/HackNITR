import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { DeleteProvider } from './contexts/delete.context';
import { UserProvider } from './contexts/user.context';
import { PlayedProvider } from './contexts/played.context';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
    <DeleteProvider> 
    <PlayedProvider>
    <App />
    </PlayedProvider>
    </DeleteProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
