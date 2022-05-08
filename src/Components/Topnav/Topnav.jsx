import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useAuth, useTheme } from 'Context';
import './Topnav.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Topnav = () => {
    const { themeState, themeDispatch } = useTheme();
    const { theme } = themeState;
    const login = false;
    const [ loggedUser, setLoggedUser ] = useState({})
    const {signOut,user} = useAuth();
    console.log(user)
    useEffect(() => {
      if(user){
        setLoggedUser(user);
      }
    },[user])
    const navigate = useNavigate()
  return (
    <div className={`topnav ${theme==="light" ? "topnav-light" : "topnav-dark"}`}>
        <h3 className="header">Ide<span className="header-span">a</span>hunt</h3>
        <div className="topnav-actions">
            {theme==="light" ? 
                <MoonIcon w={10} h={10} color="teal" className="icon" onClick={()=>themeDispatch({type: "dark"})}/> 
                : 
                <SunIcon w={10} h={10} color="teal" className="icon" onClick={()=>themeDispatch({type: "light"})}/>}
            {login ? 
              <Link to="/login"><Button colorScheme="teal" variant='solid'>Login</Button></Link>
              : 
              <Button colorScheme="teal" variant='solid' onClick={()=> {signOut();
              navigate("/login")} } >Logout</Button>}
              <Link to={`/Profile/${loggedUser ? loggedUser.id:"" }`}>
              <Button colorScheme="teal" variant='link' >profile</Button>
              </Link>
        </div>
    </div>
  )
}

export { Topnav };
