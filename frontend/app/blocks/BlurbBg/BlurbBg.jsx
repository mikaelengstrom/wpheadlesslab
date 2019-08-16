import React from 'react';
import { observer } from 'mobx-react-lite';

import { Link } from 'react-router-dom';

import './BlurbBg.scss';

const BlurbBg = observer(({ title, image, link }) => {
    return (
        <div 
            style={{backgroundImage: `url('${image}')`}}
            className="BlurbBg"
        >
            <Link to={link.url}>
                Click here
            </Link>
        </div>
    );
}); 

export default BlurbBg; 