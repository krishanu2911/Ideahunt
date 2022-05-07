import { useContext, createContext, useReducer } from 'react';
import { Reducer } from './Reducer';

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({children}) => {
    const [themeState, themeDispatch] = useReducer(Reducer, {theme: localStorage.getItem("theme") || "light"});
    return (
        <ThemeContext.Provider value={{themeState, themeDispatch}}>
            {children}
        </ThemeContext.Provider>
    );
}

export { useTheme, ThemeProvider };