import { Button } from 'Components';
import { useTheme } from 'Context';
import React from 'react';
import style from './Hero.module.css';
import { Link } from 'react-router-dom';

const hero1 = 'https://ik.imagekit.io/ecomdiagonalley/Ideahunt/lagom-people-discussing-the-idea-of-a-new-project-in-the-office_5AuZStHF-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651896650224';
const hero2 = 'https://ik.imagekit.io/ecomdiagonalley/Ideahunt/3d-hands-fun-and-wild-712_pkqnkddOU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651896650456';
const Hero = () => {
    const { themeState } = useTheme();
    const { theme } = themeState;
    const heroText = theme==="light" ? style.text_light : style.text_dark;
  return (
    <div>
        <div className={style.hero_container}>
            <img src={hero1} alt="hero" className={style.hero}/>
            <div className={style.hero_details}>
                <div className={`${heroText} ${style.hero_text}`}>
                    Worrying about ideas, don't know where to start or what to choose. Join here, to connect with
                    different people with their ideas and know about their projects.
                </div>
                <Link to="/explore"><Button text='BROWSE IDEAS' contained={true} large={true}/></Link>
            </div>
        </div>
        <div className={`${style.hero_container} ${style.hero_gutter}`}> 
            <div className={style.hero_details}>
                <div className={`${heroText} ${style.hero_text}`}>
                    Learn about different ideas, connect to authors, collaborate and build awesome projects.
                    Ready to get started?
                </div>
                <Link to="/explore"><Button text='HOP IN TO GET AMAZED' large={true}/></Link>
            </div>
            <img src={hero2} alt="hero" className={style.hero}/>
        </div>
    </div>  
  )
}

export { Hero };
