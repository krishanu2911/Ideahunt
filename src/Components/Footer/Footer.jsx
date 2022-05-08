import { useTheme } from 'Context';
import style from './Footer.module.css';

const react_icon = 'https://ik.imagekit.io/ecomdiagonalley/Ideahunt/structure-removebg-preview_wgChIrEpR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651942971483';
const Footer = () => {
  const { themeState } = useTheme();
  const { theme } = themeState;
  const footerColor = theme==="light" ? style.footer_light : style.footer_dark
  return (
    <div className={`${style.footer} ${footerColor}`}>
        Made with <img src={react_icon} alt="react icon" className={style.icons}/> by <span className="span-text">Hoisters</span>
    </div>
  )
}

export { Footer };