import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, ThemeProvider } from 'Context';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from "react-supabase";
import { supabase } from "supabaseClient";
// import { extendTheme } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById('root'));

// const theme = extendTheme({
//   colors: {
//     brand: {
//       primary: "rgb(0,127,255)",
//       primary_hover: "rgb(0,89,178)",
//       bg_dark: "rgb(0,30,60)",
//       bg_light: "rgb(255,255,255)",
//       grey: "rgb(243,246,249)",
      
//     },
//   },
//   font: {
//     brand: {
//       font: "Roboto', sans-serif",
//       font_header: "Nunito', sans-serif",
//     }
//   }
// })
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
