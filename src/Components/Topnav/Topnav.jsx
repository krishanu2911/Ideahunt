import React, {  useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useAuth, useTheme } from 'Context';
import './Topnav.css';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { MdLogout, MdExplore } from 'react-icons/md';

const Topnav = () => {
    const { themeState, themeDispatch } = useTheme();
    const { theme } = themeState;
    const navigate = useNavigate();
    const {logoutHandler, userLogin , user} = useAuth();
    const [showDropdown, setShowDropdown] = useState();
  const logo = 'https://ik.imagekit.io/ecomdiagonalley/Ideahunt/Hackathonlogo_x4b03tz7a.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1652029750780'
  return (
    <div className={`topnav ${theme==="light" ? "topnav-light" : "topnav-dark"}`}>
        <h3 className="header" 
            onClick={()=>{
              setShowDropdown(false)
              navigate('/')}}><img src={logo} alt="logo" className="logo"/></h3>
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
                    <span>{`Hello, ${user?.user_metadata?.firstname}`}</span>
                    <Button leftIcon={<FiUser />}
                            colorScheme="black" 
                            variant='link' 
                            onClick={()=>{
                              setShowDropdown(false)
                              navigate(`/Profile/${user ? user?.id : ""}`)}}>Profile</Button>
                    <Button leftIcon={<MdExplore />}
                            colorScheme="black" 
                            variant='link' 
                            onClick={()=>{
                              setShowDropdown(false)
                              navigate("/explore")}}>Explore</Button>  
                    <Button leftIcon={<MdLogout />}
                            colorScheme="black" 
                            variant='link' 
                            onClick={()=> {
                              setShowDropdown(false)
                              logoutHandler(navigate)}}>Logout</Button>
                  </div>}
                
              </>
              :
              <Link to="/login"><Button colorScheme="teal" variant='solid'>Login</Button></Link>}
        </div>
    </div>
  )
}

export { Topnav };
