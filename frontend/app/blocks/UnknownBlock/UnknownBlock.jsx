import React from 'react';
// import { observer } from 'mobx-react-lite';

import './index.scss';

const UnknownBlock = ({ missingComponentId }) => {
    return (
        <div className="UnknownBlock">
            Could not find block with id: "{missingComponentId}"
        </div>
    );
}; 

export default UnknownBlock; 