import React from 'react';
import classes from './Footer.module.css';
import { FiGithub } from 'react-icons/fi';

function Footer() {
    return (
        <a href='https://github.com/tquintal/' target='_blank' rel='noreferrer' className={classes['footer']}><FiGithub /> tquintal</a>
    );
};

export default Footer;
