import React from 'react';
import classes from './Footer.module.css';
import { FiGithub } from 'react-icons/fi';

function Footer() {
    return (
        <a href='https://to-do-app-tquintal.vercel.app/' target='_blank' rel='noreferrer' className={classes['footer']}><FiGithub /> V2</a>
    );
};

export default Footer;
