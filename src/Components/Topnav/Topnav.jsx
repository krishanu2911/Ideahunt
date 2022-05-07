import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useTheme } from 'Context';
import './Topnav.css';

const Topnav = () => {
    const { themeState, themeDispatch } = useTheme();
    const { theme } = themeState;
    const login = false;
  return (
    <div className={`topnav ${theme==="light" ? "topnav-light" : "topnav-dark"}`}>
        <h3 className="header">Ide<span className="header-span">a</span>hunt</h3>
        <div className="topnav-actions">
            {theme==="light" ? 
                <MoonIcon w={10} h={10} color="teal" className="icon" onClick={()=>themeDispatch({type: "dark"})}/> 
                : 
                <SunIcon w={10} h={10} color="teal" className="icon" onClick={()=>themeDispatch({type: "light"})}/>}

            {login ? 
              <Button colorScheme="teal" variant='solid'>Login</Button>
              : 
              <Button colorScheme="teal" variant='solid'>Logout</Button>}
        </div>
    </div>
  )
}

export { Topnav };
