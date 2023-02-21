import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './context/StateProvider';
import reducer, { initialState } from './utils';
import { BrowserRouter } from 'react-router-dom';



import { ProductProvider } from './context/productsContext';
import { AuthProvider } from './context/authContext';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
      <StateProvider reducer={reducer} initialState={initialState}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
      </ProductProvider>
    </AuthProvider>

  
  </React.StrictMode>
);

