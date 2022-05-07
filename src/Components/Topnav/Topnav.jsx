import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useTheme } from 'Context';
import './Topnav.css';

const Topnav = () => {
    const { themeState } = useTheme();
    const { theme } = themeState;
  return (
    <div>
      <h3>Ideahunt</h3>
      <div>
          {theme==="light" ? <MoonIcon w={6} h={6} color='blue'/> : <SunIcon w={6} h={6} color="blue"/>}
      </div>
    <Button colorScheme="blue" variant='solid'>Login</Button>
    <Button colorScheme="blue" variant='outline'>Signup</Button>
    </div>
  )
}

export { Topnav };
