import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, ThemeProvider } from 'Context';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from "react-supabase";
import { supabase } from "supabaseClient";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <ThemeProvider>
          <Provider value={supabase}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
