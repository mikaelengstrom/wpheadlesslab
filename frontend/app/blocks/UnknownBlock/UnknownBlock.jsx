import React from 'react';

import './UnknownBlock.scss';

const UnknownBlock = ({ missingComponentId }) => {
    return (
        <div className="UnknownBlock">
            Could not find block with id: "{missingComponentId}"
        </div>
    );
}; 

export default UnknownBlock; 