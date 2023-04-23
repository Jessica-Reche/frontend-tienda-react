import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './context/StateProvider';
import reducer, { initialState } from './reducer';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StateProvider reducer={reducer} initialState={initialState}>
          <App />
        </StateProvider>
      </AuthProvider>
    </BrowserRouter>


  </React.StrictMode>
);

