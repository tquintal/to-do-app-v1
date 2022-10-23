import React from 'react';
import classes from './InputButton.module.css';

const InputButton = props => {
    return (
        <button
            className={props.className}
            type={props.type || 'button'}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default InputButton;
