import React from 'react';
import './Button.css';

const Button = (props) => {
  const { text, contained, large, error } = props;
  return (
    <button className={`button 
                        ${contained ? "button-contained" : "button-outlined"}
                        ${large ? "button-large": ""}
                        ${error ? "error-button" : ""}`} {...props}>
        {text}
    </button>
  )
}

export { Button };