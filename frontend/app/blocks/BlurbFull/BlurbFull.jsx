import React from 'react';
import { observer } from 'mobx-react-lite';

import { Link } from 'react-router-dom';

import './index.scss';

const BlurbFull = observer(({ title, image, link }) => {
    return (
        <div className="BlurbFull">
            <h1>{title}</h1>
            
            {image && 
                <img src={image} />
            }

            <Link to={link.url}>
                Click here
            </Link>
        </div>
    );
}); 

export default BlurbFull; 