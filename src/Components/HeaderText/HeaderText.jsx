import React from 'react';
import style from './HeaderText.module.css';
import { useTheme } from 'Context';

const HeaderText = (props) => {
    const { themeState } = useTheme();
    const { theme } = themeState;
    const { text } = props;
    const textHeader = theme==="light" ? style.text_light : style.text_dark;
  return (
    <div className={`${style.header_text} ${textHeader}`}>{text}</div>
  )
}

export { HeaderText }