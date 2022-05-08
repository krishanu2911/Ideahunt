import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useAuth, useTheme } from 'Context';
import './Topnav.css';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';

const Topnav = () => {
    const { themeState, themeDispatch } = useTheme();
    const { theme } = themeState;
    const {logoutHandler, userLogin} = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState();

  return (
    <div className={`topnav ${theme==="light" ? "topnav-light" : "topnav-dark"}`}>
        <h3 className="header">Ide<span className="header-span">a</span>hunt</h3>
        <div className="topnav-actions">
            {theme==="light" ? 
                <MoonIcon w={10} h={10} color="teal" className="icon" onClick={()=>themeDispatch({type: "dark"})}/> 
                : 
                <SunIcon w={10} h={10} color="teal" className="icon" onClick={()=>themeDispatch({type: "light"})}/>}
            {userLogin ? 
              <>
                <Icon as={FaUserAlt} w={10} h={10} className="icon" color="teal" onClick={()=>setShowDropdown(!showDropdown)}></Icon>
                {showDropdown &&
                  <div className="topnav-links">
                    <Button leftIcon={<FiUser />}
                            colorScheme="black" 
                            variant='link' 
                            onClick={()=>navigate("/profile")}>Profile</Button>       
                    <Button leftIcon={<MdLogout />}
                            colorScheme="black" 
                            variant='link' 
                            onClick={()=> logoutHandler(navigate)}>Logout</Button>
                  </div>}
                
              </>
              :
              <Link to="/login"><Button colorScheme="teal" variant='solid'>Login</Button></Link>}
        </div>
    </div>
  )
}

export { Topnav };
