
import React from 'react';

import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import './Footer.scss';

const Footer = observer(() => {

    return (
        <footer
            className="Footer"
        >   
            A small footer (c) 2019
        </footer>
    );
});

export default Footer; 